import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Container, Divider } from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';
import logo from '../assets/logo.png'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Aquí iría la lógica para iniciar sesión con email y contraseña
    console.log('Email:', email);
    console.log('Password:', password);
  };

  const handleGoogleLogin = () => {
    // Aquí iría la lógica para iniciar sesión con Google
    console.log('Iniciar sesión con Google');
  };

  return (
    <Container maxWidth="xs" style={{ marginTop: '5vh' }}>
      <Box display="flex" flexDirection="column" alignItems="center">
        <img src={logo} alt="Logo"  height={60} />
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
      </Box>
    </Container>
  );
};

export default Login;
