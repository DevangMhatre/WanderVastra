const products = [
  {
    name: "Lightweight Linen Vacation Shirt",
    description:
      "A breathable linen shirt designed for warm-weather travel and beach vacations. Its relaxed fit and airy fabric make it perfect for tropical destinations, sunset dinners, and exploring coastal towns.",
    price: 699,
    discountPrice: 599,
    countInStock: 20,
    sku: "VAC-SH-001",
    category: "Top Wear",
    brand: "Island Threads",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Sky Blue", hex: "#87CEEB" },
      { name: "Sand", hex: "#C2B280" },
    ],
    collections: "Beach Vacation",
    material: "Linen",
    gender: "Men",
    images: [
      {
        url: "https://res.cloudinary.com/doifvftgw/image/upload/f_auto,q_auto,c_limit,w_1200/v1773490034/products/bsuhinvkhvhjm9gnufvw.jpg",
        altText: "Linen Vacation Shirt",
      },
    ],
    rating: 4.6,
    numReviews: 12,
  },

  {
    name: "Tropical Resort Shirt",
    description:
      "A vibrant tropical shirt made for beach holidays and summer getaways. The relaxed silhouette and lightweight viscose fabric make it ideal for warm climates.",
    price: 600,
    discountPrice: 499,
    countInStock: 35,
    sku: "VAC-SH-002",
    category: "Top Wear",
    brand: "Beach Breeze",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Palm Green", hex: "#2E8B57" },
      { name: "Ocean Blue", hex: "#1CA3EC" },
    ],
    collections: "Tropical Vacation",
    material: "Viscose",
    gender: "Men",
    images: [
      {
        url: "https://res.cloudinary.com/doifvftgw/image/upload/f_auto,q_auto,c_limit,w_1200/v1773490063/products/okwcbtqi5mxt3tj50sfq.jpg",
        altText: "Tropical Resort Shirt",
      },
    ],
    rating: 4.7,
    numReviews: 15,
  },

  {
    name: "Travel Denim Shirt",
    description:
      "A lightweight denim shirt designed for city exploration and road trips. Durable yet comfortable, it pairs perfectly with shorts or chinos during travel.",
    price: 799,
    discountPrice: 599,
    countInStock: 15,
    sku: "VAC-SH-003",
    category: "Top Wear",
    brand: "Nomad Denim",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Light Blue", hex: "#ADD8E6" },
      { name: "Dark Wash", hex: "#1F3A5F" },
    ],
    collections: "City Travel",
    material: "Denim",
    gender: "Men",
    images: [
      {
        url: "https://res.cloudinary.com/doifvftgw/image/upload/f_auto,q_auto,c_limit,w_1200/v1773490062/products/hrrk6wbp4b171kawncac.jpg",
        altText: "Travel Denim Shirt",
      },
    ],
    rating: 4.6,
    numReviews: 8,
  },

  {
    name: "Printed Island Shirt",
    description:
      "A fun island-style shirt featuring tropical prints and a relaxed camp collar. Ideal for beach resorts, cruises, and sunny vacations.",
    price: 499,
    discountPrice: 399,
    countInStock: 25,
    sku: "VAC-SH-004",
    category: "Top Wear",
    brand: "Ocean Breeze",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Palm Print", hex: "#3A7D44" },
      { name: "Sunset Orange", hex: "#FF5E3A" },
    ],
    collections: "Island Getaway",
    material: "Viscose",
    gender: "Men",
    images: [
      {
        url: "https://res.cloudinary.com/doifvftgw/image/upload/f_auto,q_auto,c_limit,w_1200/v1773490037/products/wnkfv9unrfep8tdwrn1t.jpg",
        altText: "Printed Island Shirt",
      },
    ],
    rating: 4.4,
    numReviews: 10,
  },

  {
    name: "Resort Polo Shirt",
    description:
      "A comfortable polo t-shirt perfect for sightseeing, travel days, or casual resort evenings. Made from soft breathable cotton.",
    price: 599,
    discountPrice: 499,
    countInStock: 50,
    sku: "VAC-TSH-005",
    category: "Top Wear",
    brand: "Coastal Style",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Navy", hex: "#000080" },
      { name: "Coral", hex: "#FF7F50" },
    ],
    collections: "Summer Vacation",
    material: "Cotton",
    gender: "Men",
    images: [
      {
        url: "https://res.cloudinary.com/doifvftgw/image/upload/f_auto,q_auto,c_limit,w_1200/v1773490044/products/rvxnv4y4dgarqixmemtd.jpg",
        altText: "Summer Polo",
      },
    ],
    rating: 4.3,
    numReviews: 22,
  },

  {
    name: "Graphic Travel Tee",
    description:
      "A relaxed graphic t-shirt inspired by travel culture and adventure.",
    price: 499,
    discountPrice: 299,
    countInStock: 40,
    sku: "VAC-TSH-006",
    category: "Top Wear",
    brand: "WanderWear",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Gray", hex: "#808080" },
    ],
    collections: "City Travel",
    material: "Cotton",
    gender: "Men",
    images: [
      {
        url: "https://res.cloudinary.com/doifvftgw/image/upload/f_auto,q_auto,c_limit,w_1200/v1773490032/products/au9xuletwwrbih5yhtmz.jpg",
        altText: "Travel Graphic Tee",
      },
    ],
    rating: 4.6,
    numReviews: 30,
  },

  {
    name: "Adventure Henley T-Shirt",
    description:
      "A rugged Henley t-shirt designed for outdoor travel and hiking adventures.",
    price: 379,
    discountPrice: 259,
    countInStock: 35,
    sku: "VAC-TSH-007",
    category: "Top Wear",
    brand: "Nomad Wear",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Olive", hex: "#556B2F" },
      { name: "Charcoal", hex: "#36454F" },
      { name: "Black", hex: "#000000" },
    ],
    collections: "Adventure Travel",
    material: "Cotton Blend",
    gender: "Men",
    images: [
      {
        url: "https://res.cloudinary.com/doifvftgw/image/upload/f_auto,q_auto,c_limit,w_1200/v1773490028/products/sclhjk3k39fvklxbjvhu.jpg",
        altText: "Adventure Henley T-Shirt",
      },
    ],
    rating: 4.5,
    numReviews: 25,
  },

  {
    name: "Slim Travel Joggers",
    description:
      "Comfortable joggers designed for long flights and casual exploration. Features stretch fabric and adjustable waistband.",
    price: 549,
    discountPrice: 459,
    countInStock: 20,
    sku: "VAC-BW-001",
    category: "Bottom Wear",
    brand: "Nomad Motion",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "Gray", hex: "#808080" },
      { name: "Navy", hex: "#000080" },
    ],
    collections: "Airport Travel",
    material: "Cotton Blend",
    gender: "Men",
    images: [
      {
        url: "https://res.cloudinary.com/doifvftgw/image/upload/f_auto,q_auto,c_limit,w_1200/v1773490047/products/fei5z3u1jy8zvjufyzyk.jpg",
        altText: "Travel Joggers",
      },
    ],
    rating: 4.5,
    numReviews: 12,
  },

  {
    name: "Adventure Cargo Pants",
    description:
      "Durable cargo pants perfect for hiking, outdoor exploration, and travel adventures. Multiple pockets keep essentials close.",
    price: 649,
    discountPrice: 450,
    countInStock: 25,
    sku: "VAC-BW-002",
    category: "Bottom Wear",
    brand: "Trail Nomad",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Olive", hex: "#556B2F" },
      { name: "Black", hex: "#000000" },
    ],
    collections: "Adventure Travel",
    material: "Cotton",
    gender: "Men",
    images: [
      {
        url: "https://res.cloudinary.com/doifvftgw/image/upload/f_auto,q_auto,c_limit,w_1200/v1773490026/products/o463nyxnqnx05ayagasl.jpg",
        altText: "Adventure Cargo Pants",
      },
    ],
    rating: 4.5,
    numReviews: 13,
  },

  {
    name: "Relaxed Beach Shorts",
    description:
      "Lightweight beach shorts perfect for seaside vacations and sunny afternoons. Breathable fabric ensures comfort all day.",
    price: 349,
    discountPrice: 249,
    countInStock: 40,
    sku: "VAC-BW-003",
    category: "Bottom Wear",
    brand: "Sunset Apparel",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Beige", hex: "#F5F5DC" },
      { name: "Blue", hex: "#0000FF" },
      { name: "White", hex: "#FFFFFF" },
    ],
    collections: "Beach Vacation",
    material: "Cotton",
    gender: "Men",
    images: [
      {
        url: "https://res.cloudinary.com/doifvftgw/image/upload/f_auto,q_auto,c_limit,w_1200/v1773490040/products/lvcmmgcnfoksyltnamrk.jpg",
        altText: "Beach Shorts",
      },
    ],
    rating: 4.7,
    numReviews: 15,
  },

  {
    name: "Vacation Denim Shorts",
    description:
      "Classic denim shorts ideal for travel days, city walks, and beach outings.",
    price: 499,
    discountPrice: 349,
    countInStock: 25,
    sku: "VAC-BW-004",
    category: "Bottom Wear",
    brand: "Nomad Denim",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Blue", hex: "#0000FF" },
      { name: "Black", hex: "#000000" },
    ],
    collections: "City Travel",
    material: "Denim",
    gender: "Men",
    images: [
      {
        url: "https://res.cloudinary.com/doifvftgw/image/upload/f_auto,q_auto,c_limit,w_1200/v1773490070/products/fczdflykvbqojxoclxz4.jpg",
        altText: "Denim Shorts",
      },
    ],
    rating: 4.7,
    numReviews: 15,
  },

  {
    name: "Coastal Travel Chino Shorts",
    description:
      "Comfortable chino shorts designed for relaxed vacation days and coastal travel. Lightweight stretch fabric ensures freedom of movement while maintaining a clean casual style.",
    price: 499,
    discountPrice: 399,
    countInStock: 30,
    sku: "VAC-BW-005",
    category: "Bottom Wear",
    brand: "Coastal Nomad",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Khaki", hex: "#C3B091" },
      { name: "Navy", hex: "#000080" },
      { name: "Olive", hex: "#556B2F" },
    ],
    collections: "Beach Vacation",
    material: "Cotton Blend",
    gender: "Men",
    images: [
      {
        url: "https://res.cloudinary.com/doifvftgw/image/upload/f_auto,q_auto,c_limit,w_1200/v1773491784/products/dj9fktxiwkr3qwjmzqja.jpg",
        altText: "Coastal Travel Chino Shorts",
      },
    ],
    rating: 4.5,
    numReviews: 14,
  },

  {
    name: "Boho Floral Vacation Blouse",
    description:
      "A breezy floral blouse designed for beach vacations and summer travel. Light and flowy with a relaxed silhouette.",
    price: 549,
    discountPrice: 450,
    countInStock: 30,
    sku: "VAC-W-001",
    category: "Top Wear",
    brand: "BohoVibes",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "White", hex: "#FFFFFF" },
      { name: "Pink", hex: "#FFC0CB" },
    ],
    collections: "Tropical Vacation",
    material: "Viscose",
    gender: "Women",
    images: [
      {
        url: "https://res.cloudinary.com/doifvftgw/image/upload/f_auto,q_auto,c_limit,w_1200/v1773490029/products/i6b06l4kcli1oicu7nkh.jpg",
        altText: "Boho Floral Blouse",
      },
    ],
    rating: 4.7,
    numReviews: 20,
  },

  {
    name: "Summer Wrap Top",
    description:
      "A chic wrap top perfect for beach dinners and resort evenings. Elegant yet comfortable for warm climates.",
    price: 649,
    discountPrice: 499,
    countInStock: 30,
    sku: "VAC-W-002",
    category: "Top Wear",
    brand: "ChicWrap",
    sizes: ["S", "M", "L"],
    colors: [
      { name: "Red", hex: "#FF0000" },
      { name: "Black", hex: "#000000" },
      { name: "White", hex: "#FFFFFF" },
    ],
    collections: "Resort Evening",
    material: "Polyester",
    gender: "Women",
    images: [
      {
        url: "https://res.cloudinary.com/doifvftgw/image/upload/f_auto,q_auto,c_limit,w_1200/v1773490059/products/bmjo9fmoshonikbe3qr4.jpg",
        altText: "Wrap Top",
      },
    ],
    rating: 4.7,
    numReviews: 22,
  },

  {
    name: "Flowy Palazzo Pants",
    description:
      "Elegant palazzo pants designed for beachside strolls and vacation evenings.",
    price: 649,
    discountPrice: 449,
    countInStock: 35,
    sku: "VAC-W-003",
    category: "Bottom Wear",
    brand: "BreezyVibes",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Green", hex: "#008000" },
      { name: "Beige", hex: "#F5F5DC" },
      { name: "Light Blue", hex: "#ADD8E6" },
    ],
    collections: "Beach Vacation",
    material: "Linen Blend",
    gender: "Women",
    images: [
      {
        url: "https://res.cloudinary.com/doifvftgw/image/upload/f_auto,q_auto,c_limit,w_1200/v1773490030/products/gp9hr7okr7btzuo50qe3.jpg",
        altText: "Palazzo Pants",
      },
    ],
    rating: 4.4,
    numReviews: 22,
  },

  {
    name: "Summer Midi Skirt",
    description:
      "A breezy midi skirt perfect for summer holidays and sightseeing trips.",
    price: 599,
    discountPrice: 449,
    countInStock: 20,
    sku: "VAC-W-004",
    category: "Bottom Wear",
    brand: "ChicStyle",
    sizes: ["S", "M", "L"],
    colors: [
      { name: "Pink", hex: "#FFC0CB" },
      { name: "Navy", hex: "#000080" },
      { name: "Black", hex: "#000000" },
    ],
    collections: "Summer Vacation",
    material: "Polyester",
    gender: "Women",
    images: [
      {
        url: "https://res.cloudinary.com/doifvftgw/image/upload/f_auto,q_auto,c_limit,w_1200/v1773490050/products/ejd68t6yqqplbvd8jxlm.jpg",
        altText: "Midi Skirt",
      },
    ],
    rating: 4.6,
    numReviews: 18,
  },

  {
    name: "Tropical Vacation Tank Top",
    description:
      "A lightweight tank top designed for beach vacations and tropical getaways. Breathable fabric keeps you cool during sunny days and seaside walks.",
    price: 399,
    discountPrice: 299,
    countInStock: 40,
    sku: "VAC-W-005",
    category: "Top Wear",
    brand: "Island Glow",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Coral", hex: "#FF7F50" },
      { name: "White", hex: "#FFFFFF" },
      { name: "Turquoise", hex: "#40E0D0" },
    ],
    collections: "Beach Vacation",
    material: "Cotton",
    gender: "Women",
    images: [
      {
        url: "https://res.cloudinary.com/doifvftgw/image/upload/f_auto,q_auto,c_limit,w_1200/v1773490067/products/ltnzzxkap1yuwdkotnhu.jpg",
        altText: "Tropical Tank Top",
      },
    ],
    rating: 4.5,
    numReviews: 16,
  },

  {
    name: "Resort Linen Button Shirt",
    description:
      "A relaxed linen button shirt perfect for resort holidays and summer travel. Elegant yet casual for beachside cafes and sunset evenings.",
    price: 699,
    discountPrice: 549,
    countInStock: 28,
    sku: "VAC-W-006",
    category: "Top Wear",
    brand: "Coastal Chic",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Beige", hex: "#F5F5DC" },
      { name: "Sky Blue", hex: "#87CEEB" },
      { name: "White", hex: "#FFFFFF" },
    ],
    collections: "Resort Evening",
    material: "Linen",
    gender: "Women",
    images: [
      {
        url: "https://res.cloudinary.com/doifvftgw/image/upload/f_auto,q_auto,c_limit,w_1200/v1773490042/products/qmyqdkuzubimolg6rbyj.jpg",
        altText: "Resort Linen Shirt",
      },
    ],
    rating: 4.6,
    numReviews: 14,
  },

  {
    name: "Sunset Beach Crop Top",
    description:
      "A stylish crop top designed for beach vacations and tropical evenings. Lightweight fabric and a relaxed fit make it perfect for warm weather and sunset strolls by the ocean.",
    price: 599,
    discountPrice: 449,
    countInStock: 35,
    sku: "VAC-W-007",
    category: "Top Wear",
    brand: "Sunset Style",
    sizes: ["S", "M", "L"],
    colors: [
      { name: "Sunset Orange", hex: "#FF5E3A" },
      { name: "Cream", hex: "#FFFDD0" },
      { name: "Black", hex: "#000000" },
    ],
    collections: "Beach Vacation",
    material: "Cotton Blend",
    gender: "Women",
    images: [
      {
        url: "https://res.cloudinary.com/doifvftgw/image/upload/f_auto,q_auto,c_limit,w_1200/v1773490061/products/ajl3srdiiydqtpppftzi.jpg",
        altText: "Sunset Beach Crop Top",
      },
    ],
    rating: 4.6,
    numReviews: 11,
  },

  {
    name: "Tropical Vacation Shorts",
    description:
      "Lightweight vacation shorts designed for beachside relaxation and tropical travel. Soft breathable fabric ensures comfort during sunny days.",
    price: 499,
    discountPrice: 349,
    countInStock: 32,
    sku: "VAC-W-008",
    category: "Bottom Wear",
    brand: "Island Breeze",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Coral", hex: "#FF7F50" },
      { name: "White", hex: "#FFFFFF" },
      { name: "Sky Blue", hex: "#87CEEB" },
    ],
    collections: "Beach Vacation",
    material: "Cotton",
    gender: "Women",
    images: [
      {
        url: "https://res.cloudinary.com/doifvftgw/image/upload/f_auto,q_auto,c_limit,w_1200/v1773490064/products/zjg0bx9wajlj6fknkz7x.jpg",
        altText: "Tropical Vacation Shorts",
      },
    ],
    rating: 4.5,
    numReviews: 13,
  },

  {
    name: "Resort Linen Shorts",
    description:
      "Comfortable linen shorts perfect for warm vacation destinations. Minimal design with breathable fabric makes them ideal for resort wear.",
    price: 499,
    discountPrice: 349,
    countInStock: 28,
    sku: "VAC-W-009",
    category: "Bottom Wear",
    brand: "Coastal Chic",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Beige", hex: "#F5F5DC" },
      { name: "White", hex: "#FFFFFF" },
      { name: "Olive", hex: "#556B2F" },
    ],
    collections: "Resort Evening",
    material: "Linen",
    gender: "Women",
    images: [
      {
        url: "https://res.cloudinary.com/doifvftgw/image/upload/f_auto,q_auto,c_limit,w_1200/v1773490043/products/jentpmjjqf5p62v6mlax.jpg",
        altText: "Resort Linen Shorts",
      },
    ],
    rating: 4.6,
    numReviews: 11,
  },

  {
    name: "Tropical Wide-Leg Pants",
    description:
      "Relaxed wide-leg pants designed for warm vacation destinations. The breathable fabric and flowing silhouette make them perfect for beach walks and sunset dinners.",
    price: 599,
    discountPrice: 449,
    countInStock: 30,
    sku: "VAC-W-010",
    category: "Bottom Wear",
    brand: "Island Escape",
    sizes: ["S", "M", "L", "XL"],
    colors: [
      { name: "Palm Green", hex: "#2E8B57" },
      { name: "Cream", hex: "#FFFDD0" },
      { name: "Terracotta", hex: "#E2725B" },
    ],
    collections: "Tropical Vacation",
    material: "Linen Blend",
    gender: "Women",
    images: [
      {
        url: "https://res.cloudinary.com/doifvftgw/image/upload/f_auto,q_auto,c_limit,w_1200/v1773490069/products/ruuzspw61qvqwu5nnlxy.jpg",
        altText: "Tropical Wide-Leg Pants",
      },
    ],
    rating: 4.6,
    numReviews: 12,
  },
];

module.exports = products;
