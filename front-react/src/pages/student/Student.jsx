import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box, Typography, Grid, Card, CardContent, CardHeader, Avatar,
  CircularProgress, Chip, Button
} from '@mui/material';
import {
  Book as BookIcon,
  Groups as GroupsIcon,
  Person as PersonIcon,
  Grading as GradingIcon
} from '@mui/icons-material';
import { useUser } from '../../contexts/UserContext';
import './Student.css';

export default function Student() {
  const { user } = useUser();
  const [courses, setCourses] = useState([]);
  const [teacherNames, setTeacherNames] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const Navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!user || !user.username) throw new Error('No user session found');

        const response = await fetch('http://localhost:5000/api/users/getcourses_byusername', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username: user.username }),
        });

        if (!response.ok) throw new Error('Failed to fetch courses');
        const data = await response.json();
        setCourses(data);

        // Fetch teacher names
        const namesMap = {};
        await Promise.all(data.map(async (course) => {
          if (course.teacherID) {
            try {
              const teacherRes = await fetch(`http://localhost:5000/api/teachers/get_teacher_by_id/${course.teacherID}`);
              if (teacherRes.ok) {
                const teacher = await teacherRes.json();
                namesMap[course.teacherID] = teacher.username;
              } else {
                namesMap[course.teacherID] = "Desconocido";
              }
            } catch (err) {
              namesMap[course.teacherID] = "Error";
            }
          }
        }));

        setTeacherNames(namesMap);
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
        <Button variant="contained" onClick={() => Navigate('..')}>
          Volver
        </Button>
      </Box>
    );
  }

  return (
    <Box className="student-container">
      <Box className="header-bar">
        <Box>
          <Typography variant="h4" fontWeight="bold">
            Hola, {user?.username?.toUpperCase()}
          </Typography>
          <Typography variant="h6">Mis cursos ({courses.length})</Typography>
        </Box>

        <Button
          variant="contained"
          className="logout-button"
          onClick={() => Navigate('/')}
        >
          Cerrar Sesión
        </Button>
      </Box>

      <Box className="courses-grid-container">
        <Grid container className="course-grid">
          {courses.map((course) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={course._id}>
              <Card className="course-card">
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: '#FF9800' }}>
                      <BookIcon />
                    </Avatar>
                  }
                  title={<Typography className="course-title">{course.name}</Typography>}
                  subheader={`ID: ${course._id}`}
                />
                <CardContent className="card-content">
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <PersonIcon fontSize="small" sx={{ mr: 1 }} />
                    <Typography variant="body2">
                      Profesor: {teacherNames[course.teacherID] || course.teacherID}
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
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
}