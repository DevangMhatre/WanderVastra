import { useDispatch, useSelector } from "react-redux";
import Hero from "../components/Layout/Hero";
import FeaturedCollection from "../components/Products/FeaturedCollection";
import FeaturesSection from "../components/Products/FeaturesSection";
import GenderCollectionSection from "../components/Products/GenderCollectionSection";
import NewArrivals from "../components/Products/NewArrivals";
import ProductDetail from "../components/Products/ProductDetail";
import ProductGrid from "../components/Products/ProductGrid";
import { useEffect, useState } from "react";
import { fetchProductsByFilter } from "../redux/slices/productSlice";
import api from "../redux/axios";

// const placeholderProducts = [
//   {
//     _id: 1,
//     name: "Product 1",
//     price: 100,
//     images: [{ url: "https://picsum.photos/500/500?random=9" }],
//   },
//   {
//     _id: 2,
//     name: "Product 2",
//     price: 100,
//     images: [{ url: "https://picsum.photos/500/500?random=10" }],
//   },
//   {
//     _id: 3,
//     name: "Product 3",
//     price: 100,
//     images: [{ url: "https://picsum.photos/500/500?random=11" }],
//   },
//   {
//     _id: 4,
//     name: "Product 4",
//     price: 100,
//     images: [{ url: "https://picsum.photos/500/500?random=12" }],
//   },
//   {
//     _id: 5,
//     name: "Product 5",
//     price: 100,
//     images: [{ url: "https://picsum.photos/500/500?random=13" }],
//   },
//   {
//     _id: 6,
//     name: "Product 6",
//     price: 100,
//     images: [{ url: "https://picsum.photos/500/500?random=14" }],
//   },
//   {
//     _id: 7,
//     name: "Product 7",
//     price: 100,
//     images: [{ url: "https://picsum.photos/500/500?random=15" }],
//   },
//   {
//     _id: 8,
//     name: "Product 8",
//     price: 100,
//     images: [{ url: "https://picsum.photos/500/500?random=16" }],
//   },
// ];

const Home = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector((state) => state.products);
  const [bestSellerProduct, setBestSellerProduct] = useState(null);

  useEffect(() => {
    dispatch(
      fetchProductsByFilter({
        gender: "Women",
        category: "Top Wear",
        limit: 8,
      }),
    );

    const fetchBestSeller = async () => {
      try {
        const response = await api.get("/api/products/best-seller");
        setBestSellerProduct(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchBestSeller();
  }, [dispatch]);

  const bestSellerId = bestSellerProduct?._id;

  return (
    <div>
      <Hero />
      <GenderCollectionSection />
      <NewArrivals />

      {/* Best Seller Section */}
      <h2 className="text-3xl text-center font-bold md:mt-5 xl:mb-1">
        Best Seller
      </h2>
      {bestSellerId ? (
        <ProductDetail productId={bestSellerId} />
      ) : (
        <p className="text-center">Loading best seller product...</p>
      )}

      {/* Top Wear for Womens Section */}
      <div className="container mx-auto">
        <h2 className="text-3xl text-center font-bold mb-4">
          Top Wear for Women
        </h2>
        {/* <ProductGrid products={placeholderProducts} /> */}
        <ProductGrid
          products={products.slice(0, 4)}
          loading={loading}
          error={error}
        />
      </div>

      {/* Featured */}
      <FeaturedCollection />
      <FeaturesSection />
    </div>
  );
};
export default Home;
