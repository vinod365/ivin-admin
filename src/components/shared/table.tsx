"use client";

import {
  GridColDef,
  GridRowsProp,
  DataGrid as MuiDataGrid,
} from "@mui/x-data-grid";

interface DataGridProps {
  columns: GridColDef[];
  rows: GridRowsProp;
  rowHeight?: number;
  pageSize?: number;
  page?: number;
}

export default function DataGrid({
  columns,
  rows,
  rowHeight = 56,
  pageSize,
  page,
}: DataGridProps) {
  return (
    <div className="flex-1">
      <MuiDataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: pageSize,
              page,
            },
          },
        }}
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
        pageSizeOptions={[5]}
        rowHeight={rowHeight}
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
