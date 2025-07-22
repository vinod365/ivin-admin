// dashboard.tsx
import Dealer from "./assets/dealer.svg";
import MoneyBag from "./assets/money-bag.svg";
import TableCar from "./assets/table-car.svg";

import DashboardCard from "./dashboard-cards";

import DashboardRecentActivity from "./dashboard-recent-activity";

const cardData = [
  {
    icon: <TableCar />,
    title: "Total Car Reports Generated",
    value: 1856,
    linkText: "View Details",
  },
  {
    icon: <Dealer />,
    title: "Total Dealer",
    value: "$256.00",
    linkText: "View Details",
  },
  {
    icon: <MoneyBag />,
    title: "Total Revenue",
    value: "$256.00",
    linkText: "View Details",
  },
];

export default async function Dashboard() {

  return (
    <div className="flex flex-col gap-5">
      <p className="font-fredoka font-semibold text-[32px] text-[#1C1C1C]">
        Welcome, 
      </p>
      <div className="flex gap-5 flex-wrap">
        {cardData.map((card, index) => (
          <DashboardCard
            key={index}
            icon={card.icon}
            title={card.title}
            value={card.value}
            linkText={card.linkText}
          />
        ))}
      </div>

      <DashboardRecentActivity />
    </div>
  );
}
