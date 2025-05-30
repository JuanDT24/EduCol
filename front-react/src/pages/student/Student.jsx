import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, Grid, Card, CardContent, CardHeader, Avatar, Button,
  CircularProgress, Chip
} from '@mui/material';
import {
  Book as BookIcon,
  Groups as GroupsIcon,
  Person as PersonIcon,
  Grading as GradingIcon,
  Logout as LogoutIcon
} from '@mui/icons-material';
import { useUser } from '../../contexts/UserContext';
import './Student.css';

export default function Student() {
  const { user } = useUser();
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const Navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user || !user.username) {
          throw new Error('No user session found');
        }

        const response = await fetch('http://localhost:5000/api/users/getcourses_byusername', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: user.username }),
        });

        if (!response.ok) throw new Error('Failed to fetch courses');
        const data = await response.json();
        setCourses(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [user]);

  if (loading) {
    return (
      <Box className="loading-container">
        <CircularProgress />
        <Typography>Loading your courses...</Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box className="error-container">
        <Typography color="error">{error}</Typography>
        <Button variant="contained" onClick={() => window.location.reload()}>
          Try Again
        </Button>
      </Box>
    );
  }

  return (
    <Box className="student-container">
      <Box className="header-bar" sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Hola, {user?.username?.toUpperCase()}
          </Typography>
          <Typography variant="h6">Mis cursos ({courses.length})</Typography>
        </Box>
        <Button
          variant="contained"
          color="inherit"
          onClick={() => Navigate('/')}
          startIcon={<LogoutIcon />}
          sx={{
            bgcolor: '#000',
            color: '#fff',
            '&:hover': { bgcolor: '#333' },
            borderRadius: 2,
            textTransform: 'none'
          }}
        >
          Cerrar sesión
        </Button>
      </Box>

      <Grid container spacing={2} className="course-grid">
        {courses.map((course) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={course._id}>
            <Card className="course-card" sx={{ height: '100%' }}>
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: '#FF9800' }}>
                    <BookIcon />
                  </Avatar>
                }
                title={<Typography className="course-title">{course.name}</Typography>}
                subheader={`ID: ${course._id}`}
                className="card-header"
              />
              <CardContent className="card-content">
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <PersonIcon fontSize="small" sx={{ mr: 1 }} />
                  <Typography variant="body2">
                    Profesor ID: {course.teacherID}
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <GroupsIcon fontSize="small" sx={{ mr: 1 }} />
                  <Typography variant="body2">
                    Estudiantes: {course.students?.length || 0}
                  </Typography>
                </Box>

                {course.gradingScheme && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                      Sistema de calificación:
                    </Typography>
                    {Object.entries(course.gradingScheme).map(([key, value]) => (
                      <Chip
                        key={key}
                        label={`${key}: ${(value * 100).toFixed(0)}%`}
                        size="small"
                        sx={{ mr: 1, mb: 1 }}
                        icon={<GradingIcon fontSize="small" />}
                      />
                    ))}
                  </Box>
                )}
                {/* Botón "Ver detalles" eliminado */}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
