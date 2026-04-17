const productService = require("../services/productService");

const getAllProducts = async (req, res) => {
  const result = await productService.getAllProducts(req.query);

  res.json({
    success: true,
    ...result,
  });
};

module.exports = { getAllProducts };
