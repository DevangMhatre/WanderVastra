import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import RadioFilter from "./RadioFilter";

// ✅ FIX: use "All" consistently (not "all")
const getFiltersFromParams = (params) => ({
  category: params.category || "All",
  gender: params.gender || "All",
  priceRange: params.priceRange || "All",
  color: params.color || "",
  size: params.size ? params.size.split(",") : [],
  material: params.material ? params.material.split(",") : [],
  brand: params.brand ? params.brand.split(",") : [],
});

const FilterSidebar = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [filters, setFilters] = useState(() =>
    getFiltersFromParams(Object.fromEntries([...searchParams])),
  );

  const sizes = ["S", "M", "L", "XL", "XXL"];

  const materials = [
    "Cotton",
    "Wool",
    "Denim",
    "Polyester",
    "Silk",
    "Linen",
    "Viscose",
    "Fleece",
  ];

  const brands = [
    "Urban Threads",
    "Modern Fit",
    "Street Styles",
    "Beach Breeze",
    "Fashionista",
    "ChicStyle",
  ];

  const categories = ["All", "Top Wear", "Bottom Wear"];
  const genders = ["All", "Men", "Women"];

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);
    const newFilters = getFiltersFromParams(params);

    // ✅ only update if actually changed
    setFilters((prev) => {
      const isSame = JSON.stringify(prev) === JSON.stringify(newFilters);
      return isSame ? prev : newFilters;
    });
  }, [searchParams]);

  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target;
    let newFilters = { ...filters };

    if (type === "checkbox") {
      if (checked) {
        newFilters[name] = [...newFilters[name], value];
      } else {
        newFilters[name] = newFilters[name].filter((item) => item !== value);
      }
    } else {
      newFilters[name] = value;
    }

    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  const updateURLParams = (newFilters) => {
    const params = new URLSearchParams();

    Object.keys(newFilters).forEach((key) => {
      const value = newFilters[key];

      if (Array.isArray(value) && value.length > 0) {
        params.set(key, value.join(","));
      } else if (
        value !== "" &&
        value !== "All" &&
        value !== 0 &&
        value !== undefined &&
        value !== null
      ) {
        params.set("page", 1);
        params.set(key, value);
      }
      // ✅ "All" automatically removes filter
    });

    setSearchParams(params);
  };

  const handlePriceRangeChange = (e) => {
    const value = e.target.value;

    let newFilters = { ...filters, priceRange: value };

    // ✅ convert range → min/max for backend
    if (value === "All") {
      delete newFilters.minPrice;
      delete newFilters.maxPrice;
    } else {
      const [min, max] = value.split("-");
      newFilters.minPrice = min;
      newFilters.maxPrice = max;
    }

    setFilters(newFilters);
    updateURLParams(newFilters);
  };
  const priceRanges = [
    { label: "All", value: "All" },
    { label: "Under ₹300", value: "0-300" },
    { label: "₹300 - ₹400", value: "300-400" },
    { label: "₹400 - ₹500", value: "400-500" },
    { label: "Above ₹500", value: "500-1000" },
  ];
  return (
    <div className="p-4">
      <h3 className="text-xl font font-medium text-gray-800 mb-4">Filter</h3>

      <RadioFilter
        title="Category"
        name="category"
        options={categories}
        value={filters.category}
        onChange={handleFilterChange}
      />

      <RadioFilter
        title="Gender"
        name="gender"
        options={genders}
        value={filters.gender}
        onChange={handleFilterChange}
      />

      {/* Price Range */}
      <div className="mb-6">
        <span className="block text-gray-600 font-medium mb-2">
          Price Range
        </span>

        {priceRanges.map((range) => {
          const id = `price-${range.value}`;

          return (
            <div key={range.value} className="flex items-center mb-1">
              <input
                id={id}
                type="radio"
                name="priceRange"
                value={range.value}
                checked={filters.priceRange === range.value}
                onChange={handlePriceRangeChange}
                className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
              />

              <label htmlFor={id} className="text-gray-700 cursor-pointer">
                {range.label}
              </label>
            </div>
          );
        })}
      </div>

      {/* Size */}
      <div className="mb-6">
        <span className="block text-gray-600 font-medium mb-2">Size</span>
        {sizes.map((size) => {
          const id = `size-${size}`;
          return (
            <div key={size} className="flex items-center mb-1">
              <input
                id={id}
                type="checkbox"
                name="size"
                value={size}
                checked={filters.size.includes(size)}
                onChange={handleFilterChange}
                className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
              />
              <label htmlFor={id} className="text-gray-700 cursor-pointer">
                {size}
              </label>
            </div>
          );
        })}
      </div>

      {/* Material */}
      <div className="mb-6">
        <span className="block text-gray-600 font-medium mb-2">Material</span>
        {materials.map((material) => {
          const id = `material-${material}`;
          return (
            <div key={material} className="flex items-center mb-1">
              <input
                id={id}
                type="checkbox"
                name="material"
                value={material}
                checked={filters.material.includes(material)}
                onChange={handleFilterChange}
                className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
              />
              <label htmlFor={id} className="text-gray-700 cursor-pointer">
                {material}
              </label>
            </div>
          );
        })}
      </div>

      {/* Brands */}
      <div className="mb-6">
        <span className="block text-gray-600 font-medium mb-2">Brands</span>
        {brands.map((brand) => {
          const id = `brand-${brand}`;
          return (
            <div key={brand} className="flex items-center mb-1">
              <input
                id={id}
                type="checkbox"
                name="brand"
                value={brand}
                checked={filters.brand.includes(brand)}
                onChange={handleFilterChange}
                className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-gray-300"
              />
              <label htmlFor={id} className="text-gray-700 cursor-pointer">
                {brand}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FilterSidebar;
