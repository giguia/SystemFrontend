import React from 'react';
import { useLeadsContext } from "../../hooks/useLeadsContext";
import { Container, Typography, Box, Paper, Grid } from '@mui/material';

const ViewLeadForm = ({ leadId }) => {
  const { leads } = useLeadsContext();

  // Find the lead with the specified ID
  const lead = leads.find(lead => lead._id === leadId);

  if (!lead) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Paper elevation={3} sx={{ padding: 5, borderRadius: 6, boxShadow: '1px 1px 8px rgba(0, 0, 0, 0.065)', backgroundColor: '#101624' }}>
        <Box mb={3} textAlign="center" style={{ backgroundColor: '#3e4396', padding: '3px', borderTopLeftRadius: '6px', borderTopRightRadius: '6px', marginTop: '4px' }}>
          <Typography variant="h4" component="h1" gutterBottom style={{ color: '#e0e0e0' }}>
            {lead.name}
          </Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" component="p" fontSize="20px" style={{ color: '#94e2cd' }}><strong>Type: </strong></Typography>
            <Typography variant="body1" component="p" fontSize="20px" style={{ color: 'white' }}>{lead.type}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" component="p" fontSize="20px" style={{ color: '#94e2cd' }}><strong>Phone Number: </strong></Typography>
            <Typography variant="body1" component="p" fontSize="20px" style={{ color: 'white' }}>{lead.phonenumber}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" component="p" fontSize="20px" style={{ color: '#94e2cd' }}><strong>Street Address: </strong></Typography>
            <Typography variant="body1" component="p" fontSize="20px" style={{ color: 'white' }}>{lead.streetaddress}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" component="p" fontSize="20px" style={{ color: '#94e2cd' }}><strong>City: </strong></Typography>
            <Typography variant="body1" component="p" fontSize="20px" style={{ color: 'white' }}>{lead.city}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" component="p" fontSize="20px" style={{ color: '#94e2cd' }}><strong>Postcode: </strong></Typography>
            <Typography variant="body1" component="p" fontSize="20px" style={{ color: 'white' }}>{lead.postcode}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" component="p" fontSize="20px" style={{ color: '#94e2cd' }}><strong>Email Address: </strong></Typography>
            <Typography variant="body1" component="p" fontSize="20px" style={{ color: 'white' }}>{lead.emailaddress}</Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body1" component="p" fontSize="20px" style={{ color: '#94e2cd' }}><strong>Assigned To: </strong></Typography>
            <Typography variant="body1" component="p" fontSize="20px" style={{ color: 'white' }}>{lead.assignedTo}</Typography>
          </Grid>
        </Grid>
        {/* Logo and company name */}
        <Box display="flex" justifyContent="flex-end" alignItems="center">
          <img
            src={process.env.PUBLIC_URL + '/logo.png'}
            alt="logo"
            style={{ width: '50px', height: '50px', marginRight: '8px' }}
          />
          <Typography variant="h6" component="h2" style={{ color: '#e0e0e0', fontSize: '1.7rem', marginTop: '2px' }}>Chromagen</Typography>
        </Box>
      </Paper>
    </Container >
  );
};

export default ViewLeadForm;
