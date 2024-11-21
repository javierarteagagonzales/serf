// src/pages/CalendarConfiguration.js

import React, { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import axios from 'axios';
import {
  Box,
  Typography,
  TextField,
  Button,
  Switch,
  Select,
  MenuItem,
  FormControl,
  FormControlLabel,
  InputLabel,
  Card,
  CardContent,
  IconButton,
  Snackbar,
} from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from 'react-router-dom';

const CalendarConfiguration = () => {
  const navigate = useNavigate();
  const { calendarId } = useParams();
  const [businessName, setBusinessName] = useState('');
  const [whatsappNumber, setWhatsappNumber] = useState('');
  const [timeFormat, setTimeFormat] = useState('12h');
  const [timezone, setTimezone] = useState('');
  const [messageType, setMessageType] = useState('confirmation');
  const [hoursBefore, setHoursBefore] = useState(24);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [showDateTime, setShowDateTime] = useState(true);
  const [confirmationReply, setConfirmationReply] = useState('');
  const [cancellationReply, setCancellationReply] = useState('');
  const [secondReminder, setSecondReminder] = useState(false);
  const [postAppointmentMessage, setPostAppointmentMessage] = useState(false);
  const [includeTimezone, setIncludeTimezone] = useState(false);
  const [calendarActive, setCalendarActive] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    const fetchCalendarConfig = async () => {
      try {
        const jwtToken = localStorage.getItem('token');
        if (!jwtToken) {
          setSnackbarMessage('Por favor, inicia sesión primero.');
          setSnackbarSeverity('error');
          setOpenSnackbar(true);
          return;
        }

        const response = await axios.get(`http://localhost:5000/api/google/calendar-config/${calendarId}`, {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        });

        if (response.status === 200) {
          const config = response.data;
          setBusinessName(config.businessName || '');
          setWhatsappNumber(config.whatsappNumber || '');
          setTimeFormat(config.timeFormat || '12h');
          setTimezone(config.timezone || '');
          setMessageType(config.messageType || 'confirmation');
          setHoursBefore(config.hoursBefore || 24);
          setConfirmationMessage(config.confirmationMessage || '');
          setShowDateTime(config.showDateTime !== undefined ? config.showDateTime : true);
          setConfirmationReply(config.confirmationReply || '');
          setCancellationReply(config.cancellationReply || '');
          setSecondReminder(config.secondReminder || false);
          setPostAppointmentMessage(config.postAppointmentMessage || false);
          setIncludeTimezone(config.includeTimezone || false);
          setCalendarActive(config.active || false);
        }
      } catch (error) {
        console.error('Error al obtener la configuración del calendario:', error);
        setSnackbarMessage('Hubo un error al obtener la configuración del calendario.');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      }
    };

    fetchCalendarConfig();
  }, [calendarId]);

  // Manejar la acción de guardar la configuración del calendario
  const handleSaveConfiguration = async () => {
    try {
      const jwtToken = localStorage.getItem('token');
      if (!jwtToken) {
        setSnackbarMessage('Por favor, inicia sesión primero.');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
        return;
      }

      await axios.post(
        `http://localhost:5000/api/google/calendar-config/${calendarId}`,
        {
          businessName,
          whatsappNumber,
          timeFormat,
          timezone,
          messageType,
          hoursBefore,
          confirmationMessage,
          showDateTime,
          confirmationReply,
          cancellationReply,
          secondReminder,
          postAppointmentMessage,
          includeTimezone,
          active: calendarActive,
        },
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      setSnackbarMessage('Configuración guardada con éxito.');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);

      // Redirigir a la configuración general después de guardar
      setTimeout(() => {
        navigate('/configuration');
      }, 1500);
    } catch (error) {
      console.error('Error al guardar la configuración del calendario:', error);
      setSnackbarMessage('Hubo un error al guardar la configuración.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />

      <Box sx={{ p: 4, flex: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconButton onClick={() => navigate('/configuration')}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4" gutterBottom>
            Configuración del Calendario {calendarId}
          </Typography>
        </Box>

        <Button variant="outlined" onClick={handleSaveConfiguration} sx={{ mb: 4 }}>
          Guardar configuración
        </Button>

        {/* Configuración de activación del calendario */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6">Estado del calendario</Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={calendarActive}
                  onChange={() => setCalendarActive((prev) => !prev)}
                />
              }
              label="Calendario activo"
            />
          </CardContent>
        </Card>

        {/* Configuración general */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6">Configuración general</Typography>

            <TextField
              label="Nombre de tu negocio/clinica/servicio"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              fullWidth
              margin="normal"
            />

            <TextField
              label="Número de WhatsApp para clientes"
              value={whatsappNumber}
              onChange={(e) => setWhatsappNumber(e.target.value)}
              fullWidth
              margin="normal"
            />

            <FormControl fullWidth margin="normal">
              <InputLabel>Formato de hora</InputLabel>
              <Select
                value={timeFormat}
                onChange={(e) => setTimeFormat(e.target.value)}
              >
                <MenuItem value="12h">Sistema horario de 12 horas (Ej: 1pm)</MenuItem>
                <MenuItem value="24h">Sistema horario de 24 horas (Ej: 13:00)</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Zona horaria"
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              fullWidth
              margin="normal"
            />
          </CardContent>
        </Card>

        {/* Opciones avanzadas */}
        {/* Sección para configurar recordatorios, mensajes y más */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6">Opciones avanzadas</Typography>
            {/* Segundo recordatorio y mensajes post-cita */}
            <FormControlLabel
              control={
                <Switch
                  checked={secondReminder}
                  onChange={() => setSecondReminder((prev) => !prev)}
                />
              }
              label="Activar segundo recordatorio el día de la cita"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={postAppointmentMessage}
                  onChange={() => setPostAppointmentMessage((prev) => !prev)}
                />
              }
              label="Activar mensaje después de la cita"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={includeTimezone}
                  onChange={() => setIncludeTimezone((prev) => !prev)}
                />
              }
              label="Agregar zona horaria al mensaje"
            />
          </CardContent>
        </Card>

        {/* Snackbar para mensajes */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <MuiAlert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
            {snackbarMessage}
          </MuiAlert>
        </Snackbar>
      </Box>
    </Box>
  );
};

export default CalendarConfiguration;
