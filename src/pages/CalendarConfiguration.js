
import React, { useState } from 'react';
import Sidebar from '../components/Sidebar';
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

import { useNavigate } from 'react-router-dom';

const CalendarConfiguration = () => {
  const navigate = useNavigate();
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
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleSaveConfiguration = () => {
    console.log('Configuración guardada:', {
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
    });
    setOpenSnackbar(true);
  };


  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />

      <Box sx={{ p: 4 }}>
        {/* Flecha de regreso */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconButton onClick={() => navigate('/configuration')}>
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h4" gutterBottom>
            Configuración para JT
          </Typography>
        </Box>

        <Button variant="outlined" onClick={handleSaveConfiguration} sx={{ mb: 4 }}>
          Guardar configuración
        </Button>

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

        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6">Tipo de mensaje</Typography>
            <FormControlLabel
              control={
                <Switch
                  checked={messageType === 'confirmation'}
                  onChange={() =>
                    setMessageType((prev) => (prev === 'confirmation' ? 'reminder' : 'confirmation'))
                  }
                />
              }
              label="Confirmación de asistencia"
            />
          </CardContent>
        </Card>

        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6">Tiempo de envío</Typography>
            <FormControl fullWidth margin="normal">
              <InputLabel>Horas antes de la cita</InputLabel>
              <Select
                value={hoursBefore}
                onChange={(e) => setHoursBefore(e.target.value)}
              >
                <MenuItem value={24}>24 horas antes (1 día antes)</MenuItem>
                <MenuItem value={48}>48 horas antes (2 días antes)</MenuItem>
                <MenuItem value={72}>72 horas antes (3 días antes)</MenuItem>
              </Select>
            </FormControl>
          </CardContent>
        </Card>

        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6">Plantilla para mensaje de confirmación</Typography>
            <TextField
              label="Título del mensaje"
              value={confirmationMessage}
              onChange={(e) => setConfirmationMessage(e.target.value)}
              fullWidth
              margin="normal"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={showDateTime}
                  onChange={() => setShowDateTime((prev) => !prev)}
                />
              }
              label="Mostrar la fecha y hora en el mensaje"
            />
          </CardContent>

          <Button
  variant="contained"
  color="secondary"
  onClick={() => alert('Mensaje de prueba enviado exitosamente')}
  sx={{ mt: 4 }}
>
  Enviar Mensaje de Prueba
</Button>
        </Card>

        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6">Opciones avanzadas</Typography>
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

        <Button variant="contained" color="primary" onClick={handleSaveConfiguration}>
          Guardar
        </Button>
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <MuiAlert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
            Configuración guardada con éxito.
          </MuiAlert>
        </Snackbar>
      </Box>
      </Box>
  );
};

export default CalendarConfiguration;
