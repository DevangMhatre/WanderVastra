import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import RadioFilter from "./RadioFilter";

const getFiltersFromParams = (params) => ({
  category: params.category || "all",
  gender: params.gender || "all",
  color: params.color || "",
  size: params.size ? params.size.split(",") : [],
  material: params.material ? params.material.split(",") : [],
  brand: params.brand ? params.brand.split(",") : [],
  minPrice: Number(params.minPrice) || 0,
  maxPrice: Number(params.maxPrice) || 100,
});

const FilterSidebar = () => {
  // ? Declaring a state variable to read and define the query params
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
    setFilters(getFiltersFromParams(params));
  }, [searchParams]);

  const handleFilterChange = (e) => {
    const { name, value, checked, type } = e.target;
    let newFilters = { ...filters };

    if (type === "checkbox") {
      if (checked) {
        newFilters[name] = [...newFilters[name], value]; // Ex. If already XS exist then append S too
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
      if (Array.isArray(newFilters[key]) && newFilters[key].length > 0) {
        params.set(key, newFilters[key].join(","));
      } else if (
        newFilters[key] !== "" &&
        newFilters[key] !== "All" &&
        newFilters[key] !== 0
      ) {
        params.set(key, newFilters[key]);
      }
    });

    setSearchParams(params);
    // ! Unnecessay navigation - useSearchParams already does it
    // navigate(`?${params.toString()}`);
  };

  // const handlePriceChange = (e) => {
  //   const newPrice = e.target.value;
  //   setPriceRange([0, newPrice]);
  //   const newFilters = { ...filters, minPrice: 0, maxPrice: newPrice };
  //   setFilters(newFilters);
  //   updateURLParams(newFilters);
  // };

  const handlePriceChange = (e) => {
    const newPrice = e.target.value;
    const newFilters = { ...filters, minPrice: 0, maxPrice: newPrice };

    setFilters(newFilters);
    updateURLParams(newFilters);
  };

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

      {/* Price Range Filter */}
      <div className="mb-8">
        <label className="block text-gray-600 font-medium mb-2">
          Price Range
        </label>
        <input
          type="range"
          name="maxPrice"
          min={0}
          max={100}
          value={filters.maxPrice}
          onChange={handlePriceChange}
          className="w-full h-2 bg-gray-300 rounded-lg appearance-none cursor-pointer"
        />
        <div className="flex justify-between text-gray-600 mb-2">
          <span>$0</span>
          <span>${filters.maxPrice}</span>
        </div>
      </div>

      {/* Size Filter */}
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

      {/* Material Filter */}
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

      {/* Brands Filter */}
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

{
  /* Color Filter 
   <div className="mb-6">
        <span className="block text-gray-600 font-medium mb-2">Color</span>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => {
            const id = `gender-${color}`;
            return (
              <button
                key={id}
                name="color"
                value={color}
                onClick={handleFilterChange}
                className={`w-8 h-8 rounded-full border border-gray-300 cursor-pointer transition hover:scale-105 ${filters.color === color ? "ring-2 ring-blue-500" : ""}`}
                style={{ backgroundColor: color.toLowerCase() }}
              ></button>
            );
          })}
        </div>
      </div> */
}

// Ok

{
  /* Category Filter */
}
{
  /* <div className="mb-6">
  <span className="block text-gray-600 font-medium mb-2">Category</span>
  {categories.map((category) => {
    const id = `category-${category}`;
    return (
      <div key={category} className="flex items-center mb-1">
        <input
          id={id}
          type="radio"
          name="category"
          value={category}
          checked={filters.category === category}
          onChange={handleFilterChange}
          className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-green-300"
        />

        <label htmlFor={id} className="text-gray-700 cursor-pointer">
          {category}
        </label>
      </div>
    );
  })}
</div>; */
}

{
  /* Gender Filter */
}
{
  /* <div className="mb-6">
  <span className="block text-gray-600 font-medium mb-2">Gender</span>
  {genders.map((gender) => {
    const id = `gender-${gender}`;
    return (
      <div key={gender} className="flex items-center mb-1">
        <input
          id={id}
          type="radio"
          name="gender"
          value={gender}
          checked={filters.gender === gender}
          onChange={handleFilterChange}
          className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-400 border-green-300"
        />

        <label htmlFor={id} className="text-gray-700 cursor-pointer">
          {gender}
        </label>
      </div>
    );
  })}
</div>; */
}
