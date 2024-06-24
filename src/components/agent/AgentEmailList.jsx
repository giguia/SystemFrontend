import { Box, Button, Snackbar, IconButton, Modal, CircularProgress } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Delete, Visibility } from '@mui/icons-material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import React, { useState } from 'react'
import { useEmailsContext } from "../../hooks/useEmailsContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import Header from '../Chart/Header';
import moment from 'moment'
import AgentReadEmail from '../../pages/agent/AgentReadEmail';

const AgentEmailList = ({ emails, userlgs, onEmailDelete }) => {
    const { dispatch } = useEmailsContext();
    const { userLG } = useAuthContext();
    const [selectedRows, setSelectedRows] = useState([]);
    const [selectedEmailId, setSelectedEmailId] = useState(null);
    const [loadingDelete, setLoadingDelete] = useState(false); // State for delete loading
    const [errorDelete, setErrorDelete] = useState(null); // State for delete error
    const [showConfirmation, setShowConfirmation] = useState(false); // State for showing delete confirmation dialog
    const [snackbarOpen, setSnackbarOpen] = useState(false); // State for Snackbar open
    const [snackbarMessage, setSnackbarMessage] = useState(""); // State for Snackbar message
    const [openViewModal, setOpenViewModal] = useState(false); // State for ViewLead modal

    const userIdToNameMap = userlgs.reduce((acc, user) => {
        acc[user._id] = user.name;
        return acc;
    }, {});

    const handleClick = async (emailId) => {
        if (!userLG) {
            return;
        }
        setSelectedEmailId(emailId);
        setShowConfirmation(true);
    };

    const handleDeleteConfirmation = async () => {
        try {
            setLoadingDelete(true); // Start delete loading
            const response = await fetch(`/api/emails/${selectedEmailId}`, {
                method: "DELETE",
                headers: {
                    'Authorization': `Bearer ${userLG.token}`
                }
            });
            const json = await response.json();

            if (response.ok) {
                dispatch({ type: "DELETE_EMAIL", payload: json });
                setSnackbarMessage("Email Deleted Successfully!");
                setSnackbarOpen(true);
                onEmailDelete();
            }
        } catch (error) {
            setErrorDelete('Error deleting email.'); // Set delete error
            console.error('Error deleting email:', error);
        } finally {
            setLoadingDelete(false); // Stop delete loading
            setShowConfirmation(false); // Close confirmation dialog
        }
    };

    const handleCloseConfirmation = () => {
        setShowConfirmation(false); // Close confirmation dialog
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    const handleOpenViewModal = (emailId) => {
        setSelectedEmailId(emailId);
        setOpenViewModal(true);
    };

    const handleCloseViewModal = () => {
        setOpenViewModal(false);
        setSelectedEmailId(null);
    };

    const iconButtonStyle = { color: "#e0e0e0" };

    const columns = [
        {
            field: "_id",
            headerName: "ID",
            flex: 1,
            minWidth: 150,
            renderCell: (params) => params.value.slice(20, 26)
        },
        {
            field: "from",
            headerName: "From",
            flex: 1,
            minWidth: 300,
        },
        {
            field: "to",
            headerName: "To",
            flex: 1,
            minWidth: 350,
            cellClassName: "name-column--cell",
        },
        {
            field: "subject",
            headerName: "Subject",
            flex: 1,
            minWidth: 350,
        },
        {
            field: "text",
            headerName: "Text",
            flex: 1,
            minWidth: 200,
        },
        {
            field: "userLG_id",
            headerName: "Submitted By",
            flex: 1,
            minWidth: 180,
            renderCell: (params) => userIdToNameMap[params.value] || params.value,
        },
        {
            field: "createdAt",
            headerName: "Sent",
            flex: 1,
            minWidth: 180,
            renderCell: (params) =>
                moment(params.row.createdAt).startOf('minute').fromNow()
        },
        {
            field: "actions",
            headerName: "Actions",
            flex: 1,
            minWidth: 200,
            renderCell: (params) => (
                <Box>
                    <IconButton onClick={() => handleOpenViewModal(params.row._id)} style={iconButtonStyle}><Visibility /></IconButton>
                    <IconButton onClick={() => handleClick(params.row._id)} style={iconButtonStyle}><Delete /></IconButton>
                </Box>
            )
        },
    ];

    return (
        <Box m="20px">
            <Header
                title="EMAILS"
                subtitle="List of Emails Sent"
            />
            <Box
                m="40px 0 0 0"
                height="75vh"
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
                        fontSize: "18px"
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
                    rows={emails}
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
            <Modal
                open={loadingDelete}
                onClose={() => setLoadingDelete(false)}
                aria-labelledby="delete-lead-modal-title"
                aria-describedby="delete-lead-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                        textAlign: 'center',
                    }}
                >
                    {loadingDelete ? (
                        <CircularProgress /> // Show CircularProgress while deleting
                    ) : (
                            <div>{errorDelete || 'Email Deleted Successfully!'}</div> // Show error or success message
                        )}
                </Box>
            </Modal>
            <Modal
                open={showConfirmation}
                onClose={handleCloseConfirmation}
                aria-labelledby="delete-confirmation-modal-title"
                aria-describedby="delete-confirmation-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: 400,
                        bgcolor: 'background.paper',
                        border: '2px solid #000',
                        boxShadow: 24,
                        p: 4,
                        textAlign: 'center',
                    }}
                >
                    <div>Are you sure you want to delete this email?</div>
                    <Button onClick={handleDeleteConfirmation}>Yes</Button>
                    <Button onClick={handleCloseConfirmation}>No</Button>
                </Box>
            </Modal>
            <Modal
                open={openViewModal}
                onClose={handleCloseViewModal}
                aria-labelledby="view-lead-modal-title"
                aria-describedby="view-lead-modal-description"
            >
                <Box
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '80%',
                        maxHeight: '80%',
                        overflow: 'auto',


                    }}
                >
                    {selectedEmailId && <AgentReadEmail emailId={selectedEmailId} />}
                </Box>
            </Modal>
            <Snackbar
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'center',
                }}
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleSnackbarClose}
                message={snackbarMessage}
                action={<CheckCircleIcon sx={{ color: '#94e2cd' }} />}
            />
        </Box>
    );
};

export default AgentEmailList;