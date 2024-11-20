import React, { useState } from 'react';
import { Box, Typography, TextField, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import Sidebar from '../components/Sidebar';

const Contacts = () => {
  // Estado local para almacenar los contactos (puedes reemplazar esto con una API en el futuro)
  const [contacts, setContacts] = useState([
    {
      id: 1,
      name: 'Javier Ar',
      whatsapp: '+51917129115',
    },
    // Puedes añadir más contactos aquí si lo deseas
  ]);

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* Encabezado */}
        <Typography variant="h4" component="h1" gutterBottom>
          Contactos
        </Typography>
        <Typography variant="body1" gutterBottom>
          Lista de contactos para usarlos en el <a href="#">calendario de SER</a>.
        </Typography>
        <Typography variant="body2" gutterBottom>
          Si usas <strong>Google Calendar</strong> para guardar tus citas ignora esta página.
        </Typography>

        {/* Botón de Crear Contacto */}
        <Button variant="contained" color="primary" sx={{ mb: 3 }}>
          Crear contacto
        </Button>

        {/* Barra de búsqueda */}
        <TextField
          label="Buscar por nombre, email o teléfono"
          variant="outlined"
          fullWidth
          sx={{ mb: 3 }}
        />

        {/* Tabla de Contactos */}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>WhatsApp</TableCell>
                <TableCell align="right">Acciones</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {contacts.map((contact) => (
                <TableRow key={contact.id}>
                  <TableCell>{contact.name}</TableCell>
                  <TableCell>{contact.whatsapp}</TableCell>
                  <TableCell align="right">
                    <Button>...</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default Contacts;
