import { useState, useEffect } from 'react';
import { useLeadsContext } from "../../hooks/useLeadsContext";
import { useAuthContext } from "../../hooks/useAuthContext";
import { Box, Button, TextField, Select, MenuItem, FormControl, InputLabel, CircularProgress, Modal, Grid } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const AgentUpdateForm = ({ unassignedId, onLeadUpdate }) => {
    const { unassignedLeads, dispatch } = useLeadsContext();
    const { userLG } = useAuthContext();

    const [leadData, setLeadData] = useState({
        name: '',
        type: '',
        phonenumber: '',
        streetaddress: '',
        city: '',
        postcode: '',
        emailaddress: '',
        callDisposition: '',
        remarks: ''
    });
    const [loading, setLoading] = useState(false); // State for loading indicator
    const [error, setError] = useState(null);
    const [openSuccessModal, setOpenSuccessModal] = useState(false);

    useEffect(() => {
        // Fetch the lead details based on the ID
        const lead = unassignedLeads.find(lead => lead._id === unassignedId);
        if (lead) {
            setLeadData({
                name: lead.name || '',
                type: lead.type || '',
                phonenumber: lead.phonenumber || '',
                streetaddress: lead.streetaddress || '',
                city: lead.city || '',
                postcode: lead.postcode || '',
                emailaddress: lead.emailaddress || '',
                callDisposition: lead.callDisposition || '',
                remarks: lead.remarks || ''
            });
        }
    }, [unassignedId, unassignedLeads]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setLeadData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true); // Start loading

        // Send the updated lead data to the backend for updating
        const response = await fetch(`/api/leads/${unassignedId}`, {
            method: 'PATCH',
            body: JSON.stringify(leadData),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${userLG.token}`
            }
        });
        const json = await response.json();

        setLoading(false); // Stop loading

        if (!response.ok) {
            setError(json.error);
        }
        if (response.ok) {
            setError(null);
            setOpenSuccessModal(true);
            // Update the lead in the local state
            dispatch({ type: 'UPDATE_STATUS', payload: json });
            // Delay the execution of onLeadUpdate to show the modal first
            setTimeout(() => {
                setOpenSuccessModal(false);
                onLeadUpdate();
            }, 2000); // 2 seconds delay
        }
    };

    const handleCloseSuccessModal = () => {
        setOpenSuccessModal(false);
    };

    return (
        <Box
            sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 900,
                bgcolor: 'background.paper',
                border: '2px solid #000',
                boxShadow: 24,
                p: 5,
            }}
        >
            <form onSubmit={handleSubmit}>
                <div className="title">Update Lead</div>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Lead Name"
                            name="name"
                            value={leadData.name}
                            onChange={handleChange}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="type-label">Type</InputLabel>
                            <Select
                                labelId="type-label"
                                name="type"
                                value={leadData.type}
                                onChange={handleChange}
                            >
                                <MenuItem value=""><em>Choose One</em></MenuItem>
                                <MenuItem value="Warehouse">Warehouse</MenuItem>
                                <MenuItem value="Restaurant">Restaurant</MenuItem>
                                <MenuItem value="Boutiques">Boutiques</MenuItem>
                                <MenuItem value="Salon">Salon</MenuItem>
                                <MenuItem value="Spa">Spa</MenuItem>
                                <MenuItem value="Manufacturing">Manufacturing</MenuItem>
                                <MenuItem value="Hotel">Hotel</MenuItem>
                                <MenuItem value="Gym">Gym</MenuItem>
                                <MenuItem value="Automotive">Automotive</MenuItem>
                                <MenuItem value="Cafe">Cafe</MenuItem>
                                <MenuItem value="Brewery">Brewery</MenuItem>
                                <MenuItem value="Pet Shops">Pet Shops</MenuItem>
                                <MenuItem value="Laundry">Laundry</MenuItem>
                                <MenuItem value="Clinic">Clinic</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Phone Number"
                            name="phonenumber"
                            value={leadData.phonenumber}
                            onChange={handleChange}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Street Address"
                            name="streetaddress"
                            value={leadData.streetaddress}
                            onChange={handleChange}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="City"
                            name="city"
                            value={leadData.city}
                            onChange={handleChange}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Postcode"
                            name="postcode"
                            value={leadData.postcode}
                            onChange={handleChange}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Email Address"
                            name="emailaddress"
                            value={leadData.emailaddress}
                            onChange={handleChange}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth margin="normal">
                            <InputLabel id="callDispo-label">Call Disposition</InputLabel>
                            <Select
                                labelId="callDispo-label"
                                name="callDisposition"
                                value={leadData.callDisposition}
                                onChange={handleChange}
                            >
                                <MenuItem value=""><em>Choose One</em></MenuItem>
                                <MenuItem value="Not Eligible">Not Eligible</MenuItem>
                                <MenuItem value="Already Installed">Already Installed</MenuItem>
                                <MenuItem value="Wrong/Not Working">Wrong/Not Working</MenuItem>
                                <MenuItem value="Booked">Booked</MenuItem>
                                <MenuItem value="Residential">Residential</MenuItem>
                                <MenuItem value="Callback">Callback</MenuItem>
                                <MenuItem value="Do Not Call">Do Not Call</MenuItem>
                                <MenuItem value="No Answer">No Answer</MenuItem>
                                <MenuItem value="Not Interested">Not Interested</MenuItem>
                                <MenuItem value="Voicemail">Voicemail</MenuItem>
                                <MenuItem value="Warm Lead">Warm Lead</MenuItem>
                                <MenuItem value="Email">Email</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            label="Remarks"
                            name="remarks"
                            value={leadData.remarks}
                            onChange={handleChange}
                            margin="normal"
                            InputProps={{
                                sx: {
                                    padding: 4, // Increase padding
                                }
                            }}
                        />
                    </Grid>
                </Grid>
                <Box mt={2}>
                    <Button variant="contained" type="submit" fullWidth>
                        {loading ? <CircularProgress size={24} /> : "Update"}
                    </Button>
                </Box>
                {error && <div className="error">{error}</div>}
            </form>
            <Modal
                open={openSuccessModal}
                onClose={handleCloseSuccessModal}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
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
                    <CheckCircleIcon sx={{ color: '#94e2cd', fontSize: 60 }} />
                    <div className="success">Update Successfully!</div>
                </Box>
            </Modal>
        </Box>
    );
};

export default AgentUpdateForm;