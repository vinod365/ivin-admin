import Refresh from "./assets/refresh_DKM.svg";
import Dealers from "./assets/dealers_DKM.svg";
import Money from "./assets/money_DKM.svg";
import Pending from "./assets/pending_DKM.svg";

const metrics = [
  { icon: Refresh, label: "Reports Generated Today", value: 225 },
  { icon: Dealers, label: "New Dealers Today", value: 36 },
  { icon: Money, label: "Revenue Today", value: "₹1.2L" },
  { icon: Pending, label: "Pending Invoices", value: 18 },
];

export default function DashboardRecentActivity() {
  return (
    <div className="px-6 py-5 flex flex-col gap-[12px] bg-white rounded-[8px] border border-[#EAEAEA]">
      <div className="flex justify-between">
        <div className="flex gap-[12px]">
          <p className="text-[20px] font-bold">Daily Key Metrics</p>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex">
          <div className="flex-2">
            <p className="font-semibold">Metric</p>
          </div>
          <div className="flex-1">
            <p className="font-semibold">Value</p>
          </div>
        </div>

        {metrics.map(({ icon: Icon, label, value }, index) => (
          <div key={index} className="flex border-t-2 border-[#EDEDED]">
            <div className="flex-2 flex gap-[12px] pt-4 items-center">
              <Icon />
              <p>{label}</p>
            </div>
            <div className="flex-1 pt-4">
              <p>{value}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
