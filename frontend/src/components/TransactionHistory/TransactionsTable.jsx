/* eslint-disable react/prop-types */
import { DataGrid } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import { useEffect } from "react";
export default function TransactionTable({ history }) {
  useEffect(() => {
    if (!history) {
      return;
    }
  }, [history]);
  const columns = [
    { field: "id", headerName: "ID", flex: 1 },
    {
      field: "amount",
      type: "number",
      headerName: "Amount",
      flex: 1,
      headerAlign: "left",
      align: "left",
    },
    { field: "transaction_type", headerName: "Type ", flex: 1 },
    {
      field: "createdAt",
      headerName: "Date",
      flex: 1,
    },
  ];
  const paginationModel = { page: 0, pageSize: 30 };
  return (
    <Paper sx={{ width: "100%", minHeight: 421 }}>
      <DataGrid
        sx={{
          pl: { lg: 0, xs: 6 },
          pr: { lg: 0, xs: 6 },
          "& .MuiDataGrid-cell:focus": {
            outline: "none",
          },
          "& .MuiDataGrid-columnHeader:focus": {
            outline: "none",
          },
          "& .MuiDataGrid-columnHeader:focus-within": {
            outline: "none",
          },
          border: 0,
          minHeight: 421,
          overflow: "hidden",
        }}
        rows={history}
        columns={columns}
        initialState={{
          pagination: { paginationModel },
          sorting: {
            sortModel: [{ field: "createdAt", sort: "desc" }],
          },
        }}
        pageSizeOptions={[5, 10]}
        disableColumnResize={true}
        disableColumnSelector={true}
        disableMultipleRowSelection={true}
        disableRowSelectionOnClick={true}
        autoPageSize={true}
        autosizeOnMount={true}
        disableColumnFilter={true}
      />
    </Paper>
  );
}
