import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent,
  Avatar,
  Button,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton
} from '@mui/material';
import {
  Class as ClassIcon,
  Assignment as AssignmentIcon,
  People as StudentsIcon,
  VideoLibrary as LessonsIcon,
  Notifications as AnnouncementsIcon,
  BarChart as AnalyticsIcon,
  Gradient as GradientIcon,
} from '@mui/icons-material';
import {useUser} from '../../contexts/UserContext';
import LogoutIcon from '@mui/icons-material/Logout';
import './Teacher.css';
import ClassesPopup from '../../components/assets/MisClases';

const Teacher = () => {
  // Data
  const classes = ['Diseño de datos 1', 'Optimización', 'Sistemas Operativos'];
  const Navigate = useNavigate();
  const { user } = useUser();
  return (
    <div className="teacher-dashboard">
      <Paper className="sidebar">
        <div className="sidebar-header">
          <GradientIcon className="brand-icon" />
          <Typography component="h2" className="app-title">EduCol</Typography>
        </div>
        
        <nav>
            <ClassesPopup />
        </nav>
      </Paper>

      <main className="main-content">
        <header className="dashboard-header">
          <Typography component="h1" className="dashboard-title">{`Bienvenido ${user.username}`}</Typography>
          <IconButton onClick={() => Navigate('..') }>
            <LogoutIcon />
          </IconButton>
        </header>

        <section className="stats-section">
          <Grid container className="stats-grid">
            {[
              { value: classes.length, label: 'Clases activas', icon: <ClassIcon /> },
              { value: '32', label: 'Estudiantes', icon: <StudentsIcon /> }
            ].map((stat, index) => (
              <Grid item key={index} className="stat-item">
                <Card className="stat-card">
                  <CardContent className="stat-content">
                    <Avatar className="stat-icon">{stat.icon}</Avatar>
                    <div className="stat-text">
                      <Typography component="h3" className="stat-value">{stat.value}</Typography>
                      <Typography className="stat-label">{stat.label}</Typography>
                    </div>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </section>

        <section className="content-grid">
          <div className="classes-column">
            <Card className="classes-card">
              <CardContent>
                <Typography component="h2" className="section-title">Mis Clases</Typography>
                <List className="classes-list">
                  {classes.map((classItem, index) => (
                    <ListItem key={index} className="class-item">
                      <ListItemIcon className="class-icon">
                        <ClassIcon />
                      </ListItemIcon>
                      <ListItemText 
                        primary={classItem} 
                        className="class-name"
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
          </div>

          
        </section>
      </main>
    </div>
  );
};

export default Teacher;