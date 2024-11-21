import React from 'react';
import { Box, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
//import ContactsIcon from '@mui/icons-material/Contacts';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';  // Asegúrate de colocar la ruta correcta del logo

const Sidebar = () => {
  return (
    <Box sx={{ width: 250, backgroundColor: '#f5f5f5', height: '100vh', padding: '1rem' }}>
      {/* Logo */}
      <Box sx={{ textAlign: 'center', marginBottom: '2rem' }}>
        <img src={logo} alt="Logo" style={{ maxWidth: '100%', height: 'auto' }} />
      </Box>

      {/* Sidebar Menu */}
      <List>
        <ListItem button component={Link} to="/configuration">
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Configuración" />
        </ListItem>
        {/*<ListItem button component={Link} to="/contacts">
          <ListItemIcon>
            <ContactsIcon />
          </ListItemIcon>
          <ListItemText primary="Contactos" />
        </ListItem>*/}
        <ListItem button component={Link} to="/reports">
          <ListItemIcon>
            <AssessmentIcon />
          </ListItemIcon>
          <ListItemText primary="Reportes" />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
