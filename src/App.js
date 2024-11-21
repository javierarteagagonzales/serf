// App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Configuration from './pages/Configuration';
import CalendarConfiguration from './pages/CalendarConfiguration';
import Reports from './pages/Reports';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/configuration" element={<Configuration />} />
        <Route path="/configuration/:calendarId" element={<CalendarConfiguration />} /> {/* Ruta dinámica */}
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </Router>
  );
}

export default App;
