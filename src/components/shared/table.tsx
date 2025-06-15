"use client";

import * as React from "react";
import { DataGrid as MuiDataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid";



interface DataGridProps {
  columns: GridColDef[];
  rows: GridRowsProp;
}

export default function DataGrid({ columns, rows }: DataGridProps) {
  return (
    <div className="flex-1">
      <MuiDataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
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
