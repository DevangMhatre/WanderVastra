import { useEffect, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../components/Products/FilterSidebar";
import SortOption from "../components/Products/SortOption";
import ProductGrid from "../components/Products/ProductGrid";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsByFilter } from "../redux/slices/productSlice";
import Pagination from "../components/Products/Pagination";

const CollectionPage = () => {
  const { collection } = useParams();
  const dispatch = useDispatch();
  // const { products, loading, error } = useSelector((state) => state.products);
  const { products, totalPages, currentPage, loading, error } = useSelector(
    (state) => state.products,
  );
  const [searchParams, setSearchParams] = useSearchParams();
  const queryParams = Object.fromEntries([...searchParams]);

  useEffect(() => {
    dispatch(fetchProductsByFilter({ collection, ...queryParams }));
  }, [dispatch, collection, searchParams]);

  // const [products, setProduct] = useState([]);
  const sidebarRef = useRef(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const handleClickOutside = (e) => {
    if (sidebarRef.current && !sidebarRef.current.contains(e.target)) {
      setIsSidebarOpen(false);
    }
  };

  const handlePageChange = (page) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page);
    setSearchParams(params);
  };

  useEffect(() => {
    // Add Event Listener for click
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     const fetchedProducts = [
  //       {
  //         _id: 1,
  //         name: "Product 1",
  //         price: 100,
  //         images: [{ url: "https://picsum.photos/500/500?random=9" }],
  //       },
  //       {
  //         _id: 2,
  //         name: "Product 2",
  //         price: 100,
  //         images: [{ url: "https://picsum.photos/500/500?random=10" }],
  //       },
  //       {
  //         _id: 3,
  //         name: "Product 3",
  //         price: 100,
  //         images: [{ url: "https://picsum.photos/500/500?random=11" }],
  //       },
  //       {
  //         _id: 4,
  //         name: "Product 4",
  //         price: 100,
  //         images: [{ url: "https://picsum.photos/500/500?random=12" }],
  //       },
  //       {
  //         _id: 5,
  //         name: "Product 5",
  //         price: 100,
  //         images: [{ url: "https://picsum.photos/500/500?random=13" }],
  //       },
  //       {
  //         _id: 6,
  //         name: "Product 6",
  //         price: 100,
  //         images: [{ url: "https://picsum.photos/500/500?random=14" }],
  //       },
  //       {
  //         _id: 7,
  //         name: "Product 7",
  //         price: 100,
  //         images: [{ url: "https://picsum.photos/500/500?random=15" }],
  //       },
  //       {
  //         _id: 8,
  //         name: "Product 8",
  //         price: 100,
  //         images: [{ url: "https://picsum.photos/500/500?random=16" }],
  //       },
  //     ];

  //     setProduct(fetchedProducts);
  //   }, 1000);
  // }, []);

  return (
    <div>
      <div className="flex flex-col lg:flex-row">
        {/* Mobile Filter button */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden border p-2 flex justify-center items-center"
        >
          <FaFilter className="mr-2" /> Filters
        </button>

        {/* Filter Sidebar */}
        <div
          ref={sidebarRef}
          className={`${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} fixed inset-y-0 z-50 left-0 w-64 bg-white overflow-y-auto transition-transform duration-300 lg:static lg:translate-x-0`}
        >
          <FilterSidebar />
        </div>

        <div className="grow p-4">
          <h2 className="text-3xl uppercase font-light mb-4 pl-4">
            All Collections
          </h2>

          {/* Sort Option */}
          <SortOption />

          {/* Product Grid */}
          <ProductGrid products={products} loading={loading} error={error} />
        </div>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};
export default CollectionPage;
