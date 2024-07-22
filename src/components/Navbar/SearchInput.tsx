"use client"
import { Search } from "lucide-react"
import { useRouter } from "next/navigation"

const SearchInput = ({
  searchInput,
  setsearchInput,
}: {
  searchInput: string
  setsearchInput: React.Dispatch<React.SetStateAction<string>>
}) => {
  const router = useRouter()

  const handleSearch = (e: any) => {
    /* console.log("In handle search") */

    if (searchInput.trim() !== "") {
      router.push(`/search?query=${searchInput}`);
    }
    /*  setsearchInput("") */
  }
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
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            router.push(`/search?query=${searchInput}`);
          }
        }}
      />
      <button
        className="bg-blue-600 rounded-r-md border-none outline-none cursor-pointer px-4 py-3 hover:bg-blue-700"
        disabled={searchInput.trim() === ""}
        onClick={handleSearch}
      >
        <Search className="h-4 w-4 text-white" />
      </button>
    </div>
  )
}
export default SearchInput
