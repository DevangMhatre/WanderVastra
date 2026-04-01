import { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
import api from "../../redux/axios";

const NewArrivals = () => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(false);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [newArrivals, setNewArrivals] = useState([]);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await api.get("/api/products/new-arrivals");
        setNewArrivals(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNewArrivals();
  }, []);

  // const newArrivals = [
  //   {
  //     _id: 1,
  //     name: "Stylish Jacket",
  //     price: 120,
  //     images: [
  //       {
  //         url: "https://picsum.photos/500/500?random=1",
  //         altText: "Stylish Jacket",
  //       },
  //     ],
  //   },
  //   {
  //     _id: 2,
  //     name: "Stylish Jacket",
  //     price: 120,
  //     images: [
  //       {
  //         url: "https://picsum.photos/500/500?random=2",
  //         altText: "Stylish Jacket",
  //       },
  //     ],
  //   },
  //   {
  //     _id: 3,
  //     name: "Stylish Jacket",
  //     price: 120,
  //     images: [
  //       {
  //         url: "https://picsum.photos/500/500?random=3",
  //         altText: "Stylish Jacket",
  //       },
  //     ],
  //   },
  //   {
  //     _id: 4,
  //     name: "Stylish Jacket",
  //     price: 120,
  //     images: [
  //       {
  //         url: "https://picsum.photos/500/500?random=4",
  //         altText: "Stylish Jacket",
  //       },
  //     ],
  //   },
  //   {
  //     _id: 5,
  //     name: "Stylish Jacket",
  //     price: 120,
  //     images: [
  //       {
  //         url: "https://picsum.photos/500/500?random=5",
  //         altText: "Stylish Jacket",
  //       },
  //     ],
  //   },
  //   {
  //     _id: 6,
  //     name: "Stylish Jacket",
  //     price: 120,
  //     images: [
  //       {
  //         url: "https://picsum.photos/500/500?random=6",
  //         altText: "Stylish Jacket",
  //       },
  //     ],
  //   },
  //   {
  //     _id: 7,
  //     name: "Stylish Jacket",
  //     price: 120,
  //     images: [
  //       {
  //         url: "https://picsum.photos/500/500?random=7",
  //         altText: "Stylish Jacket",
  //       },
  //     ],
  //   },
  //   {
  //     _id: 8,
  //     name: "Stylish Jacket",
  //     price: 120,
  //     images: [
  //       {
  //         url: "https://picsum.photos/500/500?random=8",
  //         altText: "Stylish Jacket",
  //       },
  //     ],
  //   },
  // ];

  const handleOnMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleOnMouseMove = (e) => {
    if (!isDragging) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startX;
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleOnMouseUpOrLeave = () => {
    setIsDragging(false);
  };

  const scroll = (direction) => {
    const scrollAmount = direction === "left" ? -300 : 300;
    scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
  };

  // Update Scroll Buttons
  const updateScrollButtons = () => {
    const container = scrollRef.current;
    if (!container) return;

    // const leftScroll = container.scrollLeft;
    // // ? Since, at first leftScroll is at 0 initially, the moment user scrolled the content, it enables it to scroll to the left side
    // const rightScrollable =
    //   container.scrollWidth > leftScroll + container.clientWidth;

    // setCanScrollLeft(leftScroll > 0);
    // setCanScrollRight(rightScrollable);

    // console.log({
    //   scrollLeft: container.scrollLeft, // * no. of pixels the content of the container has been scrolled
    //   clientWidth: container.clientWidth, // * portion of the container that is visible to user
    //   containerScrollWidth: container.scrollWidth, // * Total width of the scrollable content inside the container
    //   offsetLeft: scrollRef.current.offsetLeft,
    // });

    const leftScroll = container.scrollLeft;

    // small tolerance for mobile fractional pixels
    const rightScrollable =
      leftScroll + container.clientWidth < container.scrollWidth - 2;

    setCanScrollLeft(leftScroll > 0);
    setCanScrollRight(rightScrollable);
  };

  // useEffect(() => {
  //   const container = scrollRef.current;
  //   if (container) {
  //     container.addEventListener("scroll", updateScrollButtons);
  //     updateScrollButtons();
  //   }
  // });

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    updateScrollButtons();

    // scroll listener
    container.addEventListener("scroll", updateScrollButtons);

    // 🔥 FIX: observe size/layout changes (real mobile fix)
    const resizeObserver = new ResizeObserver(updateScrollButtons);
    resizeObserver.observe(container);

    // also run after full page load (images affect width)
    window.addEventListener("load", updateScrollButtons);

    return () => {
      container.removeEventListener("scroll", updateScrollButtons);
      resizeObserver.disconnect();
      window.removeEventListener("load", updateScrollButtons);
    };
  }, [newArrivals]);

  return (
    <section className="py-16 px-4 lg:px-0">
      <div className="container mx-auto text-center mb-10 relative">
        <h2 className="text-3xl font-bold mb-4">Explore New Arrivals</h2>
        <p className="text-lg text-gray-700 mb-8">
          Discover the latest styles straight off the runaway, freshly added to
          keep your wardrobe on the cutting edge of fashion.
        </p>

        {/* Scroll */}
        <div className="absolute right-0 -bottom-14 flex space-x-2">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`p-2 rounded border border-gray-300 ${canScrollLeft ? "bg-white text-black" : "bg-gray-300 text-gray-400 cursor-not-allowed"}`}
          >
            <FiChevronLeft className="text-2xl text-gray-700" />
          </button>
          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`p-2 rounded border border-gray-300 ${canScrollRight ? "bg-white text-black" : "bg-gray-300 text-gray-400 cursor-not-allowed"}`}
          >
            <FiChevronRight className="text-2xl text-gray-700" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div
          ref={scrollRef}
          className=" overflow-x-scroll flex space-x-6 relative"
          onMouseDown={handleOnMouseDown}
          onMouseMove={handleOnMouseMove}
          onMouseUp={handleOnMouseUpOrLeave}
          onMouseLeave={handleOnMouseUpOrLeave}
        >
          {newArrivals.map((product) => (
            <div
              key={product?._id}
              className="min-w-full sm:min-w-[50%] lg:min-w-[30%] group relative"
              // className="mx-4 md:space-x-6 min-w-[90%] sm:min-w-[50%] lg:min-w-[30%] relative"
            >
              <img
                src={product?.images[0]?.url}
                alt={product?.images[0]?.altText || product?.name}
                className="w-full h-125 object-cover rounded-lg"
                draggable="false"
              />
              {/* <div className="absolute bottom-0 left-0 right-0 bg-transparent/1 backdrop-blur-[5px] text-white p-4 rounded-b-lg">
                <Link to={`/product/${product._id}`} className="block">
                  <h4 className="font-medium">{product.name}</h4>
                  <p className="mt-1">${product.price}</p>
                </Link>
              </div> */}
              <div className="absolute bottom-0 left-0 right-0 bg-black/10 backdrop-blur-sm text-white p-4 rounded-b-lg transition-all duration-300 group-hover:bg-black/30 group-hover:backdrop-blur-md">
                <Link to={`/product/${product._id}`} className="block">
                  <h4 className="font-medium transition-colors duration-300 group-hover:text-white">
                    {product.name}
                  </h4>
                  <p className="mt-1">₹{product.discountPrice}</p>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default NewArrivals;
