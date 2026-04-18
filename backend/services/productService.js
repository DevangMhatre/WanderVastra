const Product = require("../models/Product");
const redisClient = require("../utils/redisClient");

// 🔹 Normalize helper (important)
const normalize = (str) => str.toLowerCase().replace(/\s+/g, "");

// 🔹 Build stable cache key
const buildCacheKey = (params) => {
  const sorted = Object.keys(params)
    .sort()
    .reduce((acc, key) => {
      acc[key] = params[key];
      return acc;
    }, {});
  return `products:${JSON.stringify(sorted)}`;
};

const getAllProducts = async (queryParams) => {
  const {
    collection,
    size,
    color,
    gender,
    minPrice,
    maxPrice,
    sortBy,
    search,
    category,
    material,
    brand,
    page = 1,
    limit = 12,
  } = queryParams;

  const cacheKey = buildCacheKey(queryParams);

  // 🔹 Check cache
  try {
    const cachedData = await redisClient.get(cacheKey);
    if (cachedData) {
      console.log(`⚡ Cache HIT: ${cacheKey}`);
      return JSON.parse(cachedData);
    }
  } catch (err) {
    console.error("Redis read error:", err);
  }

  const query = {};

  // ✅ CATEGORY
  if (category && category.toLowerCase() !== "all") {
    query.category = normalize(category);
  }

  // ✅ COLLECTION (only if you actually use it in frontend)
  if (collection && collection.toLowerCase() !== "all") {
    query.collections = normalize(collection);
  }

  // ✅ GENDER (must match enum exactly: Men/Women/Unisex)
  if (gender && gender.toLowerCase() !== "all") {
    query.gender = gender;
  }

  // ✅ SIZE
  if (size) {
    query.sizes = { $in: size.split(",") };
  }

  // ✅ MATERIAL
  if (material) {
    query.material = {
      $in: material.split(",").map((m) => m.trim()),
    };
  }

  // ✅ BRAND
  if (brand) {
    query.brand = {
      $in: brand.split(",").map((b) => b.trim()),
    };
  }

  // ✅ COLOR (FIXED — nested field)
  if (color) {
    query["colors.name"] = {
      $in: color.split(","),
    };
  }

  // ✅ PRICE
  if (minPrice || maxPrice) {
    query.discountPrice = {};

    if (minPrice) query.discountPrice.$gte = Number(minPrice);
    if (maxPrice) query.discountPrice.$lte = Number(maxPrice);
  }

  // ✅ SEARCH
  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  // ✅ SORT
  let sort = {};
  if (sortBy === "priceAsc") sort.price = 1;
  if (sortBy === "priceDesc") sort.price = -1;
  if (sortBy === "popularity") sort.rating = -1;

  // ✅ PAGINATION
  const pageNum = Number(page) || 1;
  const limitNum = Math.min(Number(limit) || 12, 50);
  const skip = (pageNum - 1) * limitNum;

  // 🔍 DEBUG (keep during testing)
  console.log("Incoming Params:", queryParams);
  console.log("Mongo Query:", query);

  const products = await Product.find(query)
    .sort(sort)
    .skip(skip)
    .limit(limitNum);

  const totalProducts = await Product.countDocuments(query);

  const result = {
    data: products,
    totalProducts,
    totalPages: Math.ceil(totalProducts / limitNum),
    currentPage: pageNum,
  };

  // 🔹 Cache result
  try {
    await redisClient.set(cacheKey, JSON.stringify(result), { EX: 60 });
  } catch (err) {
    console.error("Redis write error:", err);
  }

  return result;
};

module.exports = { getAllProducts };
