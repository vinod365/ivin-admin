"use client";

import { GridColDef } from "@mui/x-data-grid";
import DataGrid from "../shared/table";

import DealerListIcon from "./assets/dealer-list.svg";

import Edit from "./assets/edit.svg";
import Delete from "./assets/delete.svg";

const actionColumn: GridColDef = {
  field: "actions",
  headerName: "Actions",
  flex: 1,
  sortable: false,
  filterable: false,
  disableColumnMenu: true,
  minWidth: 150,
  renderCell: (params) => (
    <div className="h-full flex items-center gap-[20px]">
      <div onClick={() => console.log(params.row.id)}>
        <Edit />
      </div>
      <div onClick={() => console.log(params.row.id)}>
        <Delete />
      </div>
    </div>
  ),
};

const columns: GridColDef[] = [
  {
    field: "image",
    headerName: "Image",
    width: 120,
    renderCell: (params) => {
      return (
        <div className="h-full flex items-center justify-center">
          <img
            width={64}
            height={64}
            className="object-contain"
            src={"https://i.ibb.co/vxjCZk4C/Frame-1167.png"}
          />
        </div>
      );
    },
  },
  {
    field: "name",
    headerName: "Dealer Name",
    width: 180,
  },
  {
    field: "email",
    headerName: "Email",
    width: 200,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 150,
  },
  {
    field: "status",
    headerName: "Status",
    width: 120,
  },
  {
    field: "lastLoginAt",
    headerName: "Last Login",
    width: 180,
  },
  {
    field: "reportsGenerated",
    headerName: "Reports Generated",
    width: 180,
  },
  actionColumn,
];

const rows = [
  {
    id: 1,
    image: "https://example.com/images/dealer1.jpg",
    name: "Aryan Motors",
    email: "contact@aryanmotors.com",
    phone: "9876543210",
    status: "active",
    lastLoginAt: "2025-06-14 10:23 AM",
    reportsGenerated: 24,
  },
  {
    id: 2,
    image: "https://example.com/images/dealer2.jpg",
    name: "Speed Wheels",
    email: "info@speedwheels.in",
    phone: "9123456789",
    status: "inactive",
    lastLoginAt: "2025-06-13 05:40 PM",
    reportsGenerated: 10,
  },
  {
    id: 3,
    image: "https://example.com/images/dealer3.jpg",
    name: "Urban Drive",
    email: "support@urbandrive.com",
    phone: "9988776655",
    status: "active",
    lastLoginAt: "2025-06-15 09:00 AM",
    reportsGenerated: 36,
  },
  {
    id: 4,
    image: "https://example.com/images/dealer4.jpg",
    name: "Auto Galaxy",
    email: "hello@autogalaxy.in",
    phone: "9012345678",
    status: "inactive",
    lastLoginAt: "2025-06-10 04:12 PM",
    reportsGenerated: 5,
  },
  {
    id: 5,
    image: "https://example.com/images/dealer5.jpg",
    name: "Nova Cars",
    email: "sales@novacars.com",
    phone: "8800123456",
    status: "active",
    lastLoginAt: "2025-06-15 11:45 AM",
    reportsGenerated: 42,
  },
  {
    id: 6,
    image: "https://example.com/images/dealer6.jpg",
    name: "Metro Motors",
    email: "metro@motors.in",
    phone: "9765432109",
    status: "inactive",
    lastLoginAt: "2025-06-12 03:27 PM",
    reportsGenerated: 13,
  },
  {
    id: 7,
    image: "https://example.com/images/dealer7.jpg",
    name: "Highway Hub",
    email: "hub@highway.com",
    phone: "9887766554",
    status: "active",
    lastLoginAt: "2025-06-14 06:05 PM",
    reportsGenerated: 28,
  },
  {
    id: 8,
    image: "https://example.com/images/dealer8.jpg",
    name: "Rapid Rides",
    email: "ride@rapidrides.com",
    phone: "9090909090",
    status: "active",
    lastLoginAt: "2025-06-15 08:30 AM",
    reportsGenerated: 33,
  },
  {
    id: 9,
    image: "https://example.com/images/dealer9.jpg",
    name: "Eco Wheels",
    email: "eco@wheels.com",
    phone: "9700000000",
    status: "inactive",
    lastLoginAt: "2025-06-11 12:50 PM",
    reportsGenerated: 7,
  },
  {
    id: 10,
    image: "https://example.com/images/dealer10.jpg",
    name: "Fusion Autos",
    email: "fusion@autos.in",
    phone: "9999888877",
    status: "inactive",
    lastLoginAt: "2025-06-13 02:10 PM",
    reportsGenerated: 19,
  },
];

export default function DealerList() {
  return (
    <div className="bg-white flex flex-col h-full gap-[12px]  px-5 py-6 border border-[#E4E4E4]  rounded-[8px] w-full">
      <div className="flex gap-[12px]">
        <DealerListIcon />
        <p className="font-medium">Dealer List</p>
      </div>
      <DataGrid columns={columns} rows={rows} rowHeight={88} />
    </div>
  );
}
