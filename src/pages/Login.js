import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Container, Divider, Snackbar } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import MuiAlert from '@mui/material/Alert';
import axios from 'axios';
import logo from '../assets/logo.png'; 
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', {
        username: email,
        password: password,
      });
      // Almacenar el token en el almacenamiento local o manejarlo como sea necesario
      localStorage.setItem('token', response.data.token);
      // Redirigir al usuario a la página de configuración
      navigate('/configuration');
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setSnackbarMessage(
        error.response && error.response.data ? error.response.data.error : 'Error al iniciar sesión'
      );
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleGoogleLogin = () => {
    // Aquí iría la lógica para iniciar sesión con Google
    console.log('Iniciar sesión con Google');
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Container maxWidth="xs" style={{ marginTop: '5vh' }}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <img src={logo} alt="Logo" height={60} />
        <Typography variant="h5" component="h1" sx={{ mt: 2, mb: 3 }}>
          SER Centro Psicológico
        </Typography>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          startIcon={<GoogleIcon />}
          onClick={handleGoogleLogin}
          sx={{ mb: 2 }}
        >
          Continuar con Google
        </Button>
        <Divider sx={{ width: '100%', mb: 2 }}>O ingresa con tu email</Divider>
        <TextField
          label="Email"
          variant="outlined"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          label="Contraseña"
          type="password"
          variant="outlined"
          fullWidth
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          sx={{ mb: 2 }}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLogin}
          sx={{ mb: 2 }}
        >
          Ingresar
        </Button>
        <Typography variant="body2" color="textSecondary" align="center">
          No tienes cuenta? <a href="/register">Créate una.</a>
        </Typography>
        <Typography variant="body2" color="textSecondary" align="center" sx={{ mt: 1 }}>
          ¿Olvidaste tu contraseña?
        </Typography>

        {/* Snackbar para mostrar mensajes */}
        <Snackbar
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleCloseSnackbar}
        >
          <MuiAlert
            onClose={handleCloseSnackbar}
            severity={snackbarSeverity}
            sx={{ width: '100%' }}
          >
            {snackbarMessage}
          </MuiAlert>
        </Snackbar>
      </Box>
    </Container>
  );
};

export default Login;
