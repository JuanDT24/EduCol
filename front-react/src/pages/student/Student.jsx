import React from 'react';
import {
  Box, Typography, Grid, Card, CardContent, CardHeader, Avatar, Button,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import BookIcon from '@mui/icons-material/MenuBook';
import './Student.css';

const courses = [
  { title: 'SISTEMAS OPERACIONALES', code: '202510_CM_IST7081_01' },
  { title: 'DEUTSCHE SPRACHE UND KULTUR', code: '202510_A2' },
  { title: 'ÉTICA', code: '202510_1243' },
  { title: 'OPTIMIZACION', code: '202510_2302' },
  { title: 'DISEÑO DE SOFTWARE I', code: '202510_2293' },
  { title: 'ESTRUCTURA DEL COMPUTADOR II', code: '202510_2287' },
];

export default function Student() {
  const handleLogout = () => {
    alert('Sesión cerrada');
  };

  return (
    <Box className="student-container">
      <Box className="header-bar">
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Hola, EMMANUEL
          </Typography>
          <Typography variant="h6">Mis cursos</Typography>
        </Box>
        <Button
          variant="contained"
          color="inherit"
          endIcon={<LogoutIcon />}
          onClick={handleLogout}
          className="logout-button"
        >
          Cerrar sesión
        </Button>
      </Box>

      <Grid container spacing={2} className="course-grid">
        {courses.map((course, idx) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={idx}>
            <Card className="course-card">
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: '#FF9800' }}>
                    <BookIcon />
                  </Avatar>
                }
                title={<Typography className="course-title">{course.title}</Typography>}
                className="card-header"
              />
              <CardContent className="card-content">
                <Typography className="course-code">{course.code}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}