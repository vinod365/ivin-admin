import SearchIcon from "./assets/search.svg"


export default function Search() {
  return (
    <div  className="bg-[#FAFAFA] flex  gap-2  px-8 py-4 border border-[#E4E4E4]  rounded-full w-full">
    <SearchIcon/>
    <input
      className="bg-[#FAFAFA]   rounded-full w-full focus:outline-none"
      placeholder="Search.."
    ></input>
    </div>
  );
}
