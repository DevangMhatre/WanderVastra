const Product = require("../models/Product");
const redisClient = require("../utils/redisClient");

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
    limit = 10,
  } = queryParams;

  // const cacheKey = `products:${JSON.stringify(queryParams)}`;
  const cacheKey = buildCacheKey(queryParams);

  //  Check cache
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

  if (collection && collection !== "all") query.collections = collection;
  if (category && category.toLowerCase() !== "all") query.category = category;

  if (material) query.material = { $in: material.split(",") };
  if (brand) query.brand = { $in: brand.split(",") };
  if (size) query.sizes = { $in: size.split(",") };
  if (color) query.colors = { $in: color.split(",") };

  if (gender) query.gender = gender;

  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  if (search) {
    query.$or = [
      { name: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
    ];
  }

  let sort = {};
  if (sortBy === "priceAsc") sort.price = 1;
  if (sortBy === "priceDesc") sort.price = -1;
  if (sortBy === "popularity") sort.rating = -1;

  const pageNum = Number(page) || 1;
  const limitNum = Math.min(Number(limit) || 10, 50);
  const skip = (pageNum - 1) * limitNum;

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

  // 🔹 Store in Redis (TTL 60s)
  try {
    await redisClient.set(cacheKey, JSON.stringify(result), { EX: 60 });
  } catch (err) {
    console.error("Redis write error:", err);
  }

  return result;
};

module.exports = { getAllProducts };
