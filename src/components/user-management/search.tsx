import SearchIcon from "./assets/search.svg"


export default function Search() {
  return (
    <div  className="bg-white flex  gap-2  px-8 py-4 border border-[#E4E4E4]  rounded-full w-full">
    <SearchIcon/>
    <input
      className="bg-white rounded-full w-full focus:outline-none"
      placeholder="Search.."
    ></input>
    </div>
  );
}
