"use client";

import { DataGrid, GridColDef, GridPaginationModel } from '@mui/x-data-grid';
import Image from "next/image";
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import toast from "react-hot-toast";

import AlertDialog from "./alartDialog";
import DealerListIcon from "./assets/dealer-list.svg";
import Edit from "./assets/edit.svg";

import { deleteUserProfile } from '@/app/(protected)/user-management/actions';
import { createSupabaseBrowserClient } from "@/lib/supabase/client";


const supabase = createSupabaseBrowserClient();


interface DealerRow {
  id: string; 
  avatar_url?: string | null; 
  public_avatar_url?: string | null; 
  full_name?: string | null;
  email?: string | null;
  phone?: string | null;
  status?: string | null;
  created_at?: string | null; 
  reportsGenerated?: number | null; 
}

interface DealerListProps {
  rows: DealerRow[]; 
  totalCount: number; 
  initialPage: number;
  initialPageSize: number; 
}

export default function DealerList({
  rows,
  totalCount,
  initialPage,
  initialPageSize,
}: DealerListProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: initialPage,
    pageSize: initialPageSize,
  });

  
  useEffect(() => {
    const pageFromUrl = parseInt(searchParams.get('page') || '0');
    const pageSizeFromUrl = parseInt(searchParams.get('pageSize') || '10');

    if (pageFromUrl !== paginationModel.page || pageSizeFromUrl !== paginationModel.pageSize) {
      setPaginationModel({ page: pageFromUrl, pageSize: pageSizeFromUrl });
    }
  }, [searchParams, paginationModel]);

  const handlePaginationModelChange = (newModel: GridPaginationModel) => {
    setPaginationModel(newModel);

    const current = new URLSearchParams(Array.from(searchParams.entries()));
    current.set('page', newModel.page.toString());
    current.set('pageSize', newModel.pageSize.toString());
    
    const search = current.toString();
    const query = search ? `?${search}` : '';

    router.push(`${window.location.pathname}${query}`); 
  };

  const processedRows = useMemo(() => {
    return rows.map(row => {
      let publicAvatarUrl: string | null = null;
      if (row.avatar_url) {
        const { data } = supabase.storage
          .from("avatar")
          .getPublicUrl(row.avatar_url);
        publicAvatarUrl = data.publicUrl;
      }
      return { ...row, public_avatar_url: publicAvatarUrl };
    });
  }, [rows]); 


  const columns: GridColDef<DealerRow>[] = useMemo(() => [
    {
      field: "image", 
      headerName: "Image",
      width: 120,
      renderCell: (params) => {
        const avatarUrl = params.row?.avatar_url || "https://i.ibb.co/vxjCZk4C/Frame-1167.png";

        return (
          <div className="h-full flex items-center justify-center">
            <Image
              alt="Profile pic"
              width={64}
              height={64}
              src={avatarUrl}
              objectFit="cover"
              className="rounded-2xl overflow-hidden"
              unoptimized={true} 
            />
          </div>
        );
      },
    },
    {
      field: "full_name",
      headerName: "Dealer Name",
      width: 180,
      renderCell: (params) => {
        return params.row.full_name || "N/A";
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 200,
      renderCell: (params) => {
        return params.row.email || "N/A";
      },
    },
    {
      field: "phone",
      headerName: "Phone",
      width: 150,
      renderCell: (params) => {
        return params.row.phone || "N/A";
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
    },
    {
      field: "last_accessed_at",
      headerName: "Last Login",
      width: 180,
      renderCell: (params) => {
        const lastLoggedInDate = params.row.created_at ? new Date(params.row.created_at) : null;
        return lastLoggedInDate ? lastLoggedInDate.toDateString() : "N/A";
      },
    },
    {
      field: "reportsGenerated",
      headerName: "Reports Generated",
      width: 180,
  
      renderCell: (params) => {
        return params.row.reportsGenerated || 0;
      }
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      minWidth: 150,
      renderCell: (params) => {
        const id = params.row.id;
        const handleConfirm = async () => {
          const result = await deleteUserProfile(id); 
          if (!result?.error) {
            toast.success("User deleted successfully.");
          } else {
            toast.error(result?.error || "Failed to delete user.");
          }
        };
        return (
          <div className="h-full flex items-center gap-[20px]">
            <div
              onClick={() => router.push(`/user-management/edit/${params.row.id}`)} 
              className="cursor-pointer" 
            >
              <Edit />
            </div>
            <div>
              <AlertDialog onConfirm={handleConfirm} />
            </div>
           
          </div>
        );
      },
    },
  ], [router]);

  return (
    <div className="bg-white flex flex-col h-full gap-[12px] px-5 py-6 border border-[#E4E4E4] rounded-[8px] w-full">
      <div className="flex gap-[12px]">
        <DealerListIcon />
        <p className="font-medium">Dealer List</p>
      </div>
      <DataGrid
        rows={processedRows}
        columns={columns}
        rowCount={totalCount} 
        paginationMode="server" 
        paginationModel={paginationModel} 
        onPaginationModelChange={handlePaginationModelChange}
        pageSizeOptions={[5, 10, 25, 50]} 
        sx={{
          fontFamily: "Poppins",
          border: "none",
          color: "#1C1C1C",
          "& .MuiDataGrid-columnSeparator": {
            display: "none",
          },
          "& .MuiDataGrid-columnHeaderTitle": {
            fontSize: "16px",
            fontWeight: 600,
          },
          "& .MuiDataGrid-cell": {
            fontSize: "16px",
            fontWeight: 400,
          },
        }}
        rowHeight={88}
        disableRowSelectionOnClick
        disableColumnSorting
        disableColumnSelector
        disableColumnFilter
        disableColumnMenu
        disableColumnResize
      />
    </div>
  );
}