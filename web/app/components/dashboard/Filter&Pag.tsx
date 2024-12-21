import { useSearchParams } from "@remix-run/react";
import { UrlCategories } from "@interfaces";
import CustomDropdown from "../CustomDropDown";

export default function FilterAndPag({
  offset,
  limit,
  category,
}: {
  offset: number;
  limit: number;
  category: UrlCategories;
}) {
  const [searchParams, setSearchParams] = useSearchParams();

  const handlePageChange = (newPage: number) => {
    setSearchParams((prev) => {
      const params = new URLSearchParams(prev.toString());
      params.set("offset", newPage.toString());
      params.set("limit", limit.toString());
      params.set("category", category);
      return params;
    });
  };

  const handleCtgChange = (selectedCategory: UrlCategories) => {
    setSearchParams({
      offset: "1",
      limit: limit.toString(),
      category: selectedCategory,
    });
  };

  return (
    <div className="container mx-auto flex justify-between items-center">
      <div className="space-x-8">
        <button
          onClick={() => handlePageChange(offset - 1)}
          disabled={offset <= 1}
          className="px-5 py-3 border border-orange-400 rounded-lg"
        >
          Prev
        </button>
        <span className="border-b border-orange-400">{offset}</span>
        <button
          onClick={() => handlePageChange(offset + 1)}
          className="px-5 py-3 border border-orange-400 rounded-lg"
        >
          Next
        </button>
      </div>
      <div className="">
        <CustomDropdown
          label="Category"
          selectedCategory={category}
          onSelectCategory={handleCtgChange}
        />
      </div>
    </div>
  );
}
