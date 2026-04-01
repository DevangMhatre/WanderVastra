import { useEffect, useState } from "react";
import { toast } from "sonner";
import ProductGrid from "./ProductGrid";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchProductDetails,
  fetchSimilarProducts,
} from "../../redux/slices/productSlice";
import { addToCart } from "../../redux/slices/cartSlice";

// const selectedProduct = {
//   _id: 1,
//   name: "Stylish Jacket",
//   price: 120,
//   orignalPrice: 150,
//   description: "Perfect for any occasion",
//   brand: "FashionBrand",
//   material: "Leather",
//   sizes: ["S", "M", "L", "XL"],
//   colors: ["Red", "Black"],
//   images: [
//     {
//       url: "https://picsum.photos/500/500?random=1",
//       altText: "Stylish Jacket 1",
//     },
//     {
//       url: "https://picsum.photos/500/500?random=2",
//       altText: "Stylish Jacket 2",
//     },
//   ],
// };

// const similarProducts = [
//   {
//     _id: 1,
//     name: "Product 1",
//     price: 100,
//     images: [{ url: "https://picsum.photos/500/500?random=5" }],
//   },
//   {
//     _id: 2,
//     name: "Product 2",
//     price: 100,
//     images: [{ url: "https://picsum.photos/500/500?random=6" }],
//   },
//   {
//     _id: 3,
//     name: "Product 3",
//     price: 100,
//     images: [{ url: "https://picsum.photos/500/500?random=7" }],
//   },
//   {
//     _id: 4,
//     name: "Product 4",
//     price: 100,
//     images: [{ url: "https://picsum.photos/500/500?random=8" }],
//   },
// ];

const ProductDetail = ({ productId }) => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, error, similarProducts, selectedProduct } = useSelector(
    (state) => state.products,
  );

  const [mainImage, setMainImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedQuantity, setSelectedQuantity] = useState(1);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  const productFetchId = productId || id;

  useEffect(() => {
    if (productFetchId) {
      dispatch(fetchProductDetails(productFetchId));
      dispatch(fetchSimilarProducts(productFetchId));
    }
  }, [dispatch, productFetchId]);

  // useEffect(() => {
  //   if (selectedProduct?.images?.length) {
  //     // eslint-disable-next-line react-hooks/set-state-in-effect
  //     setMainImage(selectedProduct?.images[0]?.url);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [selectedProduct]);
  useEffect(() => {
    if (selectedProduct?.images?.length) {
      setMainImage(selectedProduct.images[0].url);
    }
  }, [selectedProduct]);

  const handleQuantityChange = (operation) => {
    if (operation === "plus") setSelectedQuantity((prev) => prev + 1);
    if (operation === "minus" && selectedQuantity > 1)
      setSelectedQuantity((prev) => prev - 1);
  };

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      toast.error("Please select a Size and Color before adding to cart.", {
        duration: 1000,
      });
      return;
    }

    setIsButtonDisabled(true);

    dispatch(
      addToCart({
        productId: productFetchId,
        quantity: selectedQuantity,
        size: selectedSize,
        color: selectedColor,
      }),
    )
      .unwrap()
      .then(() => {
        toast.success("Product added to cart!", { duration: 1000 });
      })
      .catch(() => {
        toast.error("Failed to add to cart");
      })
      .finally(() => {
        setIsButtonDisabled(false);
      });
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="mb-3">
      {selectedProduct && (
        <div className="max-w-6xl mx-auto bg-white p-8 rounded-lg">
          {/* Product Section */}
          <div className="flex flex-col md:flex-row">
            {/* Left Thumbnails */}
            <div className="hidden md:flex flex-col space-y-4 mr-6">
              {selectedProduct?.images?.map((image, index) => (
                <img
                  key={index}
                  src={image?.url}
                  alt={image.altText || `Thumbnail ${index}`}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${mainImage === image.url ? "border-black" : "border-gray-300"}`}
                  onClick={() => setMainImage(image.url)}
                />
              ))}
            </div>

            {/* Main Image */}
            <div className="md:w-1/2">
              <div className="mb-4">
                {mainImage && (
                  <img
                    src={mainImage}
                    alt={
                      selectedProduct.images[0]?.altText ||
                      `Thumbnail ${selectedProduct._id}`
                    }
                    className="w-full h-auto object-cover rounded-lg"
                  />
                )}
              </div>
            </div>

            {/* Mobile Thumbnails */}
            <div className="md:hidden flex overflow-x-scroll space-x-4 mb-4">
              {selectedProduct?.images?.map((image, index) => (
                <img
                  key={index}
                  src={image?.url}
                  alt={image.altText || `Thumbnail ${index}`}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${mainImage === image.url ? "border-black" : "border-gray-300"}`}
                  onClick={() => setMainImage(image.url)}
                />
              ))}
            </div>

            {/* Right Side of Product Cart */}
            <div className="md:w-1/2 md:ml-10">
              {/* Product Name */}
              <h1 className="text-2xl md:text-3xl font-semibold mb-2">
                {selectedProduct.name}
              </h1>

              {/* Original Price */}
              <p className="text-lg text-gray-600 mb-1 line-through">
                {selectedProduct.price && `${selectedProduct.price}`}
              </p>

              {/* Discounted Price */}
              <p className="text-xl text-gray-500 mb-2">
                ₹{selectedProduct.discountPrice}
              </p>

              {/* Description */}
              <p className="text-gray-600 mb-4">
                {selectedProduct.description}
              </p>

              {/* Colors */}
              <div className="mb-4">
                <p className="text-gray-700">Color:</p>
                <div className="flex gap-2 mt-2">
                  {selectedProduct?.colors?.map((color) => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color.name)}
                      className={`w-8 h-8 rounded-full border cursor-pointer ${
                        selectedColor === color.name
                          ? "ring-2 ring-black"
                          : "border-gray-300"
                      }`}
                      style={{
                        backgroundColor: color.hex,
                        // filter: "brightness(0.5)",
                      }}
                    ></button>
                  ))}
                </div>
              </div>

              {/* Sizes */}
              <div className="pt-1 pb-4">
                <p className="text-gray-700">Size:</p>
                <div className="flex gap-2 mt-2">
                  {selectedProduct.sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 rounded border cursor-pointer ${selectedSize === size ? "bg-black text-white" : "hover:bg-gray-300"} `}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity */}
              <div className="mb-6">
                <p className="text-gray-700">Quantity:</p>
                <div className="flex items-center space-x-4 mt-2">
                  <button
                    className="px-3 py-1 bg-gray-200 hover:bg-gray-300 rounded text-lg cursor-pointer"
                    onClick={() => handleQuantityChange("minus")}
                  >
                    -
                  </button>
                  <span className="text-lg">{selectedQuantity}</span>
                  <button
                    className="px-2.5 py-1 bg-gray-200 hover:bg-gray-300  rounded text-lg cursor-pointer"
                    onClick={() => handleQuantityChange("plus")}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={isButtonDisabled}
                className={`bg-black text-white py-2 px-6 rounded w-full mb-4 cursor-pointer transition-all ${isButtonDisabled ? "cursor-not-allowed opacity-50" : "hover:bg-gray-800 "}`}
              >
                {isButtonDisabled ? "Adding..." : "Add to Cart"}
              </button>

              {/* Characteristics */}
              <div className="mt-7 text-gray-700">
                <h3 className="text-xl font-bold mb-2">Characteristics:</h3>
                <table className="w-full text-left text-sm text-gray-600">
                  <tbody>
                    <tr>
                      <td className="py-1">Brand</td>
                      <td className="py-1">{selectedProduct.brand}</td>
                    </tr>
                    <tr>
                      <td className="py-1">Material</td>
                      <td className="py-1">{selectedProduct.material}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* YOU MAY ALSO LIKE SECTION */}
          <div className="mt-20">
            <h2 className="text-3xl text-center font-medium mb-4">
              You may also like
            </h2>
            <ProductGrid products={similarProducts} />
          </div>
        </div>
      )}
    </div>
  );
};
export default ProductDetail;
