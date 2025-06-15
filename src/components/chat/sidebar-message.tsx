export default function SidebarMessage() {
  return (
    <div className="py-4 flex items-center gap-4 ">
      <div className="w-16 h-16 overflow-hidden">
        <img src={"/user.png"} alt="user" />
      </div>

      <div className="flex flex-col max-w-[221px]">
        <div className="flex items-center justify-between mb-[10]">
          <p className="text-[#1C1C1C]">VinDetective</p>
          <p className="text-[12px] text-[#4D4D4D]">10:45 AM</p>
        </div>

        <p className="truncate">
          Yes, I’ve seen that VIN in an auction before.
        </p>
      </div>
    </div>
  );
}
