import DealerList from "./dealer-list";
import Search from "./search";

export default function UserManagement() {
  return (
    <div className="flex flex-col gap-5 h-full">
      <p className="font-fredoka font-semibold text-[32px] text-[#1C1C1C] ">
        List of Dealers
      </p>
      <Search />
      <div className="flex-1">
        <DealerList />
      </div>
    </div>
  );
}
