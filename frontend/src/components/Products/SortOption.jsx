import { useSearchParams } from "react-router-dom";

const SortOption = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSortChange = (e) => {
    const sortBy = e.target.value;
    searchParams.set("sortBy", sortBy);
    setSearchParams(searchParams);
  };

  return (
    <div className="my-2 flex items-center justify-end">
      <select
        className="border p-2 mr-2 rounded-md focus:outline-none"
        id="sort"
        value={searchParams.get("sortBy") || ""}
        onChange={handleSortChange}
      >
        <option value="">Default</option>
        <option value="priceAsc">Price: Low to High</option>
        <option value="priceDes">Price: High to Low</option>
        <option value="popularity">Popularity</option>
      </select>
    </div>
  );
};
export default SortOption;
