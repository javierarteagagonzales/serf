import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, List, ListItem, ListItemText, ListItemSecondaryAction, Switch } from '@mui/material';
import Sidebar from '../components/Sidebar';
import AddGoogleCalendarModal from '../components/AddGoogleCalendarModal';
import axios from 'axios';

const Configuration = () => {
  const [calendars, setCalendars] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);

  useEffect(() => {
    fetchCalendars();
  }, []);

  const fetchCalendars = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/google/calendars');
      setCalendars(response.data);
    } catch (error) {
      console.error('Error al obtener los calendarios:', error);
    }
  };

  const handleAddCalendarOpen = () => setOpenAddModal(true);
  const handleAddCalendarClose = () => setOpenAddModal(false);

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Configuración
        </Typography>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleAddCalendarOpen}
          sx={{ mb: 3 }}
        >
          Agregar Calendario
        </Button>
        <AddGoogleCalendarModal
          open={openAddModal}
          handleClose={handleAddCalendarClose}
          refreshCalendars={fetchCalendars}
        />

        <List>
          {calendars.map((calendar) => (
            <ListItem key={calendar.id} divider>
              <ListItemText primary={calendar.summary} secondary={calendar.timeZone} />
              <ListItemSecondaryAction>
                <Switch
                  edge="end"
                  checked={calendar.active}
                />
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
};

export default Configuration;
