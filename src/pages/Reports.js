import React from 'react';
import { Box, Typography, Card, CardContent, Button, Grid } from '@mui/material';
import { Line } from 'react-chartjs-2';
import Sidebar from '../components/Sidebar';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

// Registrar los componentes de Chart.js
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Reports = () => {
  // Datos para el gráfico
  const data = {
    labels: [
      '2024-11-01', '2024-11-02', '2024-11-03', '2024-11-04', '2024-11-05',
      '2024-11-06', '2024-11-07', '2024-11-08', '2024-11-09', '2024-11-10',
      '2024-11-11', '2024-11-12', '2024-11-13', '2024-11-14', '2024-11-15',
      '2024-11-16', '2024-11-17', '2024-11-18', '2024-11-19', '2024-11-20',
    ],
    datasets: [
      {
        label: 'Citas confirmadas',
        data: Array(20).fill(0),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      },
      {
        label: 'Citas canceladas',
        data: Array(20).fill(0),
        borderColor: 'rgba(255, 99, 132, 1)',
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        fill: true,
      },
      {
        label: 'Citas esperando respuesta',
        data: Array(20).fill(0),
        borderColor: 'rgba(255, 206, 86, 1)',
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        fill: true,
      },
      {
        label: 'Mensaje no entregado',
        data: Array(20).fill(0),
        borderColor: 'rgba(255, 159, 64, 1)',
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        fill: true,
      },
    ],
  };

  // Opciones para el gráfico
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
    },
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        {/* Encabezado */}
        <Typography variant="h4" component="h1" gutterBottom>
          Reportes
        </Typography>
        <Typography variant="body1" gutterBottom>
          Monitorea todo lo que esta pasando con tus citas, mensajes y confirmaciones.
        </Typography>

        {/* Tarjetas de estadísticas */}
        <Grid container spacing={2} sx={{ mb: 4 }}>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Mensajes totales enviados</Typography>
                <Typography variant="h4">0</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Citas confirmadas</Typography>
                <Typography variant="h4" color="green">0</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Citas canceladas</Typography>
                <Typography variant="h4" color="red">0</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Esperando respuesta</Typography>
                <Typography variant="h4" color="orange">0</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={3}>
            <Card>
              <CardContent>
                <Typography variant="h6">Mensajes no entregados</Typography>
                <Typography variant="h4" color="warning">0</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Botón para descargar reporte */}
        <Button variant="outlined" sx={{ mb: 3 }}>
          Descargar reporte
        </Button>

        {/* Gráfico de citas */}
        <Line data={data} options={options} />
      </Box>
    </Box>
  );
};

export default Reports;
