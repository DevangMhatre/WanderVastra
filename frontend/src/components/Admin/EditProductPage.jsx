import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { fetchProductDetails } from "../../redux/slices/productSlice";
import { updateProduct } from "../../redux/slices/adminProductSlice";

const EditProductPage = () => {
  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    countInStock: 0,
    sku: "",
    category: "",
    brand: "",
    sizes: [],
    colors: [],
    collections: "",
    material: "",
    gender: "",
    images: [],
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { selectedProduct, loading, error } = useSelector(
    (state) => state.products,
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedProduct) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setProductData(selectedProduct);
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct({ id, productData }));
    navigate("/admin/products");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Okay
  return (
    // <div className="max-w-5xl mx-auto p-6 shadow-md rounded-md">
    <div className="max-w-5xl mx-auto p-4 sm:p-6 shadow-md rounded-md">
      <h2 className="text-3xl font-bold mb-6">Edit Product</h2>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Product Name</label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            // className="w-full border border-gray-300 rounded-md p-2"
            className="w-full border border-gray-300 rounded p-2 text-sm sm:text-base"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Description</label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            // className="w-full border border-gray-300 rounded-md p-2"
            className="w-full border border-gray-300 rounded p-2 text-sm sm:text-base"
            rows={4}
            required
          />
        </div>

        {/* Price */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Price</label>
          <input
            type="number"
            name="price"
            value={productData.price}
            onChange={handleChange}
            // className="w-full border border-gray-300 rounded p-2"
            className="w-full border border-gray-300 rounded p-2 text-sm sm:text-base"
            required
          />
        </div>

        {/* Count In Stock */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Count In Stock</label>
          <input
            type="number"
            name="countInStock"
            value={productData.countInStock}
            onChange={handleChange}
            // className="w-full border border-gray-300 rounded p-2"
            className="w-full border border-gray-300 rounded p-2 text-sm sm:text-base"
            required
          />
        </div>

        {/* SKU */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">SKU</label>
          <input
            type="text"
            name="sku"
            value={productData.sku}
            onChange={handleChange}
            // className="w-full border border-gray-300 rounded p-2"
            className="w-full border border-gray-300 rounded p-2 text-sm sm:text-base"
            required
          />
        </div>

        {/* Sizes */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">
            Sizes (comma-seperated)
          </label>
          <input
            type="text"
            name="sizes"
            value={productData.sizes.join(", ")}
            onChange={(e) =>
              setProductData({
                ...productData,
                sizes: e.target.value.split(",").map((size) => size.trim()),
              })
            }
            // className="w-full border border-gray-300 rounded p-2"
            className="w-full border border-gray-300 rounded p-2 text-sm sm:text-base"
            required
          />
        </div>

        {/* Colors */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Colors</label>

          {productData.colors.map((color, index) => (
            // <div key={index} className="flex gap-2 mb-2 items-center">
            <div
              key={index}
              className="flex flex-col sm:flex-row gap-2 mb-2 sm:items-center"
            >
              {/* Color Name */}
              <input
                type="text"
                placeholder="Color name"
                value={color.name}
                onChange={(e) => {
                  const updatedColors = [...productData.colors];
                  updatedColors[index].name = e.target.value;
                  setProductData({ ...productData, colors: updatedColors });
                }}
                // className="border p-2 rounded w-1/3"
                className="border p-2 rounded w-full sm:w-1/3"
                required
              />

              {/* Hex Input */}
              <input
                type="text"
                placeholder="#FFFFFF"
                value={color.hex}
                onChange={(e) => {
                  const value = e.target.value;

                  // simple hex validation
                  const isValidHex =
                    /^#([0-9A-F]{3}){1,2}$/i.test(value) || value === "";

                  if (isValidHex) {
                    const updatedColors = [...productData.colors];
                    updatedColors[index].hex = value;
                    setProductData({ ...productData, colors: updatedColors });
                  }
                }}
                // className="border p-2 rounded w-1/3"
                className="border p-2 rounded w-full sm:w-1/3"
                required
              />

              {/* Color Picker */}
              <input
                type="color"
                value={color.hex || "#000000"}
                onChange={(e) => {
                  const updatedColors = [...productData.colors];
                  updatedColors[index].hex = e.target.value;
                  setProductData({ ...productData, colors: updatedColors });
                }}
                // className="w-12 h-10 p-1 border rounded cursor-pointer"
                className="w-full sm:w-12 h-10 p-1 border rounded cursor-pointer"
              />

              {/* Delete Button */}
              <button
                type="button"
                onClick={() => {
                  const updatedColors = productData.colors.filter(
                    (_, i) => i !== index,
                  );
                  setProductData({ ...productData, colors: updatedColors });
                }}
                className="text-red-500 font-bold px-2 hover:bg-red-300 hover:rounded hover:cursor-pointer"
              >
                ✕
              </button>
            </div>
          ))}

          {/* Add Color Button */}
          <button
            type="button"
            onClick={() =>
              setProductData({
                ...productData,
                colors: [...productData.colors, { name: "", hex: "#000000" }],
              })
            }
            // className="mt-2 p-2 text-blue-600 font-medium hover:bg-blue-300 hover:rounded hover:cursor-pointer"
            className="mt-2 w-full sm:w-auto p-2 text-blue-600 font-medium hover:bg-blue-300 hover:rounded"
          >
            + Add Color
          </button>
        </div>

        {/* Image URL */}
        <div className="mb-6">
          <label className="block font-semibold mb-2">Image URL</label>

          <input
            type="url"
            placeholder="https://example.com/image.jpg"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();

                const url = e.target.value.trim();
                if (!url) return;

                setProductData((prevData) => ({
                  ...prevData,
                  images: [...prevData.images, { url, altText: "" }],
                }));

                e.target.value = "";
              }
            }}
            className="w-full border border-gray-300 rounded p-2"
          />

          <p className="text-sm text-gray-500 mt-1">Press Enter to add image</p>

          {/* Preview */}
          <div className="flex gap-4 mt-4 flex-wrap">
            {productData.images.map((image, index) => (
              <div key={index} className="relative">
                <img
                  src={image.url}
                  alt="Product"
                  // className="w-20 h-20 object-cover rounded-md shadow-md"
                  className="w-24 h-24 sm:w-20 sm:h-20 object-cover rounded-md shadow-md"
                />

                {/* Delete button */}
                <button
                  type="button"
                  onClick={() => {
                    const updatedImages = productData.images.filter(
                      (_, i) => i !== index,
                    );
                    setProductData({ ...productData, images: updatedImages });
                  }}
                  className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-1 hover:cursor-pointer hover:bg-red-600"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        <button
          type="submit"
          // className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition-colors cursor-pointer"
          className="w-full bg-green-500 text-white py-3 sm:py-2 rounded-md hover:bg-green-600 transition-colors"
        >
          Update Product
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;

{
  /* Colors */
}
{
  /* <div className="mb-6">
  <label className="block font-semibold mb-2">Colors (comma-seperated)</label>
  <input
    type="text"
    name="colors"
    value={productData.colors.join(", ")}
    onChange={(e) =>
      setProductData({
        ...productData,
        colors: e.target.value.split(",").map((color) => color.trim()),
      })
    }
    className="w-full border border-gray-300 rounded p-2"
    required
  />
</div>; */
}
