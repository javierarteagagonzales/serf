// src/pages/Configuration.js

import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Switch,
} from '@mui/material';
import Sidebar from '../components/Sidebar';
import AddGoogleCalendarModal from '../components/AddGoogleCalendarModal';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Configuration = () => {
  const [calendars, setCalendars] = useState([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCalendars();
  }, []);

  // Función para obtener los calendarios desde el backend
  const fetchCalendars = async () => {
    try {
      const jwtToken = localStorage.getItem('token');
      if (!jwtToken) {
        console.error('Por favor, inicia sesión primero.');
        return;
      }

      const response = await axios.get('http://localhost:5000/api/google/calendars', {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });
      setCalendars(response.data);
    } catch (error) {
      console.error('Error al obtener los calendarios:', error);
    }
  };

  // Abrir el modal para agregar un calendario
  const handleAddCalendarOpen = () => setOpenAddModal(true);
  const handleAddCalendarClose = () => setOpenAddModal(false);

  // Manejar el cambio de estado del switch de cada calendario
  const handleCalendarToggle = async (calendarId, currentStatus) => {
    try {
      const jwtToken = localStorage.getItem('token');
      if (!jwtToken) {
        console.error('Por favor, inicia sesión primero.');
        return;
      }

      // Actualizar el estado del calendario en el backend
      const response = await axios.post(
        `http://localhost:5000/api/google/toggle-calendar`,
        { calendarId, active: !currentStatus },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      if (response.status === 200) {
        // Actualizar la lista de calendarios en el frontend
        setCalendars((prevCalendars) =>
          prevCalendars.map((calendar) =>
            calendar.id === calendarId ? { ...calendar, active: !currentStatus } : calendar
          )
        );

        // Redirigir al usuario a la configuración del calendario si se activa
        if (!currentStatus) {
          navigate(`/configuration/${calendarId}`);
        }
      }
    } catch (error) {
      console.error('Error al actualizar el estado del calendario:', error);
    }
  };

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
              <ListItemText
                primary={`${calendar.summary} (ID: ${calendar.id})`}
                secondary={calendar.timeZone}
              />
              <ListItemSecondaryAction>
                <Switch
                  edge="end"
                  checked={calendar.active}
                  onChange={() => handleCalendarToggle(calendar.id, calendar.active)}
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
