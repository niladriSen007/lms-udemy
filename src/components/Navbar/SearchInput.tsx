"use client"
import { Search } from "lucide-react"

const SearchInput = ({
  searchInput,
  setsearchInput,
}: {
  searchInput: string
  setsearchInput: React.Dispatch<React.SetStateAction<string>>
}) => {
  return (
    <div className="max-md:hidden rounded-md flex  w-[40%]">
      <input
        className="flex-grow bg-[#FFF8EB] rounded-l-md shadow-sm border-none outline-none text-sm pl-4 pr-2 py-3"
        type="text"
        placeholder="Search courses..."
        value={searchInput}
        onChange={(e) => {
          setsearchInput(e.target.value)
        }}
      />
      <button
        className="bg-blue-600 rounded-r-md border-none outline-none cursor-pointer px-4 py-3 hover:bg-blue-700"
        disabled={searchInput.trim() === ""}
        /* onClick={handleSearch} */
      >
        <Search className="h-4 w-4 text-white" />
      </button>
    </div>
  )
}
export default SearchInput
