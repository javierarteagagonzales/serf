import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Configuration from './pages/Configuration';
import Contacts from './pages/Contacts';
import Reports from './pages/Reports';
import CalendarConfiguration from './pages/CalendarConfiguration'; // Añadido

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/configuration" element={<Configuration />} />
        <Route path="/configuration/1" element={<CalendarConfiguration />} /> {/* Nueva ruta */}
        {/*<Route path="/contacts" element={<Contacts />} />*/}
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </Router>
  );
}

export default App;
