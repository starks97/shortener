import { useSearchParams } from "@remix-run/react";
import { UrlCategories } from "@interfaces";
import CustomDropdown from "../CustomDropDown";
import ToolTip from "../ToolTip";

export default function FilterAndPag({
  offset,
  limit,
  category,
  dataLength,
}: {
  offset: number;
  limit: number;
  category: UrlCategories;
  dataLength: number;
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
    <div className="container mx-auto flex justify-center flex-col md:flex-row md:justify-between items-center space-y-5">
      <div className="space-x-8">
        <button
          onClick={() => handlePageChange(offset - 1)}
          disabled={offset <= 1}
          className="px-5 py-3 border border-orange-400 rounded-lg"
        >
          Prev
        </button>
        <span className="border-b border-orange-400">{offset}</span>
        {dataLength < limit ? (
          <ToolTip label="no data">
            <button
              disabled={dataLength < limit}
              onClick={() => handlePageChange(offset + 1)}
              className="px-5 py-3 border border-orange-400 rounded-lg"
            >
              Next
            </button>
          </ToolTip>
        ) : (
          <button
            disabled={dataLength < limit}
            onClick={() => handlePageChange(offset + 1)}
            className="px-5 py-3 border border-orange-400 rounded-lg"
          >
            Next
          </button>
        )}
      </div>
      <div className="">
        <CustomDropdown
          label="Category"
          selectedCategory={category}
          onSelectCategory={handleCtgChange}
          isFiltered={true}
        />
      </div>
    </div>
  );
}
