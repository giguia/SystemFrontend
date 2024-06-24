import { Box } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import React, { useState } from 'react'

import Header from '../Chart/Header';

const LeadGenStats = ({ leadGenStats }) => {
    const [selectedRows, setSelectedRows] = useState([]);

    const columns = [
        {
            field: "_id",
            headerName: "ID",
            flex: 1,
            minWidth: 200,
            renderCell: (params) => params.value.slice(20, 26)
        },
        {
            field: "leadGenName",
            headerName: "Lead Gen",
            flex: 1,
            minWidth: 350,
            cellClassName: "name-column--cell",
        },
        {
            field: "leadsCreatedToday",
            headerName: "Leads Today",
            flex: 1,
            minWidth: 350,
        },
        {
            field: "leadsCreated",
            headerName: "Total Leads",
            flex: 1,
            minWidth: 350,
        },
        {
            field: "leadsAssigned",
            headerName: "Leads Assigned",
            flex: 1,
            minWidth: 350,
        },
        {
            field: "leadsAvailable",
            headerName: "Leads Available",
            flex: 1,
            minWidth: 300,
            cellClassName: "name-column--cell",
        },
    ];

    return (
        <Box m="20px">
            <Header
                title="LEAD GENERATION PERFORMANCE"
                subtitle="Lead Summary"
            />
            <Box
                m="30px 0 0 0"
                height="39vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                        color: "#e0e0e0",
                        borderTop: "1px solid #525252",
                    },
                    "& .name-column--cell": {
                        color: "#94e2cd",
                    },
                    "& .MuiDataGrid-columnHeader": {
                        backgroundColor: "#3e4396",
                        borderBottom: "none",
                        color: "#e0e0e0",
                        fontSize: "18px",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: "#101624",
                        fontSize: "17px",
                    },
                    "& .MuiDataGrid-headerContainer": {
                        borderTop: "none",
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: "#3e4396",
                    },
                    "& .MuiCheckbox-root": {
                        color: `#b7ebde !important`,
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `#e0e0e0 !important`,
                    },
                }}
            >
                <DataGrid
                    rows={leadGenStats}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: { pageSize: 25, page: 0 },
                        },
                    }}
                    checkboxSelection
                    onSelectionModelChange={(newSelection) => {
                        setSelectedRows(newSelection);
                    }}
                    selectionModel={selectedRows}
                    slots={{
                        toolbar: GridToolbar,
                    }}
                    getRowId={row => row._id}
                />
            </Box>
        </Box>
    );
};

export default LeadGenStats;
