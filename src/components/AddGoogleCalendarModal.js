// src/components/AddGoogleCalendarModal.js

import React, { useState } from 'react';
import { Box, Button, Typography, Modal, Tab, Tabs, List, ListItem, ListItemText, CircularProgress } from '@mui/material';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const AddGoogleCalendarModal = ({ open, handleClose, refreshCalendars }) => {
  const [tabValue, setTabValue] = useState(1);
  const [calendars, setCalendars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  // Función para iniciar la autenticación con Google
  const handleGoogleLogin = async () => {
    try {
      const jwtToken = localStorage.getItem('token');
      if (!jwtToken) {
        setError('Por favor, inicia sesión primero.');
        return;
      }

      window.location.href = `http://localhost:5000/api/google/auth?token=${jwtToken}`;
    } catch (error) {
      console.error('Error al autenticar con Google:', error);
      setError('Error al autenticar con Google.');
    }
  };

  // Función para obtener los calendarios de Google del usuario autenticado
  const fetchGoogleCalendars = async () => {
    setLoading(true);
    try {
      const jwtToken = localStorage.getItem('token');
      if (!jwtToken) {
        setError('Por favor, inicia sesión primero.');
        setLoading(false);
        return;
      }

      const response = await axios.get('http://localhost:5000/api/google/calendars', {
        headers: {
          Authorization: `Bearer ${jwtToken}`,
        },
      });

      if (response.status === 200) {
        setCalendars(response.data);
      }
    } catch (err) {
      console.error('Error al obtener los calendarios de Google:', err);
      setError('Hubo un error al obtener los calendarios. Inténtalo de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  // Función para seleccionar y guardar un calendario específico
  const handleCalendarSelect = async (calendarId) => {
    try {
      const jwtToken = localStorage.getItem('token');
      if (!jwtToken) {
        setError('Por favor, inicia sesión primero.');
        return;
      }

      const selectedCalendar = calendars.find((cal) => cal.id === calendarId);
      if (!selectedCalendar) {
        setError('Calendario no encontrado.');
        return;
      }

      // Enviar la solicitud POST para guardar el calendario seleccionado
      await axios.post(
        'http://localhost:5000/api/google/save-calendars',
        {
          calendars: [selectedCalendar],
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );

      // Refrescar la lista de calendarios en la vista principal
      refreshCalendars();
      handleClose();
    } catch (err) {
      console.error('Error al guardar el calendario:', err);
      setError('Hubo un error al guardar el calendario. Inténtalo de nuevo.');
    }
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
          Conecta tu calendario de Google
        </Typography>
        <Tabs value={tabValue} onChange={handleChangeTab} aria-label="Tabs de selección de calendario">
          <Tab label="Calendario de SER" />
          <Tab label="Calendario de Google" />
        </Tabs>
        {tabValue === 1 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" sx={{ mb: 2 }}>
              Google Calendars
            </Typography>
            {calendars.length === 0 && (
              <>
                <Typography variant="body1" sx={{ mb: 2 }}>
                  Puedes conectar con Google para sincronizar tus calendarios y seleccionar uno:
                </Typography>
                <Button variant="contained" color="primary" onClick={handleGoogleLogin}>
                  Conectar con Google
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={fetchGoogleCalendars}
                  sx={{ mt: 2 }}
                  disabled={loading}
                >
                  {loading ? <CircularProgress size={24} /> : 'Obtener calendarios'}
                </Button>
              </>
            )}
            {calendars.length > 0 && (
              <List>
                {calendars.map((calendar) => (
                  <ListItem key={calendar.id} button onClick={() => handleCalendarSelect(calendar.id)}>
                    <ListItemText primary={calendar.summary} />
                  </ListItem>
                ))}
              </List>
            )}
            {error && <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>}
          </Box>
        )}
      </Box>
    </Modal>
  );
};

export default AddGoogleCalendarModal;
