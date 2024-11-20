import React, { useState } from 'react';
import { Box, Button, Typography, Modal, Tab, Tabs, List, ListItem, ListItemText } from '@mui/material';
import { useGoogleLogin } from '@react-oauth/google';
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
  const [error, setError] = useState('');

  const handleChangeTab = (event, newValue) => {
    setTabValue(newValue);
  };

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const response = await axios.post('http://localhost:5000/api/google/add-calendar', {
          accessToken: tokenResponse.access_token,
        });

        if (response.status === 200) {
          setCalendars(response.data);
        }
      } catch (err) {
        setError('Hubo un error al agregar el calendario. Inténtalo de nuevo.');
      }
    },
    onError: () => setError('Error al autenticar con Google.'),
  });

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-title" variant="h6" component="h2" sx={{ mb: 2 }}>
          Crea el calendario donde guardarás las citas
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
                  Estos son los calendarios que tienes en Google Calendar. Escoge el calendario donde crearás las citas:
                </Typography>
                <Button variant="contained" color="primary" onClick={login}>
                  Conectar con Google
                </Button>
              </>
            )}
            {calendars.length > 0 && (
              <List>
                {calendars.map((calendar) => (
                  <ListItem key={calendar.id} button onClick={() => handleClose(calendar.id)}>
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
