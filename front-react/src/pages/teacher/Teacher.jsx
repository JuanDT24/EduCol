import React from "react";
import { useNavigate } from "react-router-dom";
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
  IconButton,
} from "@mui/material";
import {
  Class as ClassIcon,
  Assignment as AssignmentIcon,
  People as StudentsIcon,
  VideoLibrary as LessonsIcon,
  Notifications as AnnouncementsIcon,
  BarChart as AnalyticsIcon,
  Gradient as GradientIcon,
  Add as AddIcon,
} from "@mui/icons-material";
import { useUser } from "../../contexts/UserContext";
import LogoutIcon from "@mui/icons-material/Logout";
import "./Teacher.css";
import ClassesPopup from "../../components/assets/MisClases";
import { getTeacherClasses, getStudents } from "./TeacherFunctions";
import { useEffect, useState } from "react";
import CreateClassPopup from "../../components/assets/CreateClassPopup";

const Teacher = () => {
  const { user } = useUser();
  const { login } = useUser();
  const [classes, setClasses] = useState([]);
  const [Students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [allStudents, setAllStudents] = useState([]);
  const [refreshFlag, setRefreshFlag] = useState(false);

  const triggerRefresh = () => {
    setRefreshFlag((prev) => !prev);
  };

  const añadirEstudiante = (estudiante) => {
    setStudents((prev) => [...prev, estudiante]);
    console.log("Estudiante añadido:", estudiante);
  };

  useEffect(() => {
    const getClasses = async (user) => {
      try {
        setLoading(true);
        const response = await getTeacherClasses(user);

        if (response && !response.error) {
          setClasses(response);

          response.map((classItem) => {
            if (classItem.students) {
              classItem.students.map((student) => {
                añadirEstudiante(student);
              });
            } else {
              console.log("No hay estudiantes en esta clase.");
            }
          });

          console.log("Clases del profesor obtenidas:", response);
          console.log("Estudiantes del profesor obtenidos:", Students);
          user.classes = response;
          console.log("Usuario actualizado:", user);
          login(user);
        } else {
          console.error("Error:", response?.error);
        }
      } catch (err) {
        console.error("Error al obtener las clases del profesor", err);
      } finally {
        setLoading(false);
      }
    };

    const getAllStudents = async () => {
      try {
        const response = await getStudents();
        const data = await response;
        setAllStudents(data);
        console.log("Estudiantes obtenidos:", data);
      } catch (error) {
        console.error("Error al obtener los estudiantes", error);
      }
    };
    getAllStudents();
    if (user) {
      getClasses(user);
    }
  }, [user, refreshFlag]);

  const handleCreate = () => {
    setOpen(true);
    console.log("Create class popup status:", open);
  };

  if (!open) {
  }
  const Navigate = useNavigate();
  return (
    <div className="teacher-dashboard">
      <Paper className="sidebar">
        <div className="sidebar-header">
          <GradientIcon className="brand-icon" />
          <Typography component="h2" className="app-title">
            EduCol
          </Typography>
        </div>

        <nav>
          <ClassesPopup clases={classes} />
        </nav>
      </Paper>

      <main className="main-content">
        <header className="dashboard-header">
          <Typography
            component="h1"
            className="dashboard-title"
          >{`Bienvenido ${user.username}`}</Typography>
          <IconButton onClick={() => Navigate("..")}>
            <LogoutIcon />
          </IconButton>
        </header>

        <section className="stats-section">
          <Grid container className="stats-grid">
            {[
              {
                value: classes.length,
                label: "Clases activas",
                icon: <ClassIcon />,
              },
              {
                value: Students.length,
                label: "Estudiantes",
                icon: <StudentsIcon />,
              },
            ].map((stat, index) => (
              <Grid item key={index} className="stat-item">
                <Card className="stat-card">
                  <CardContent className="stat-content">
                    <Avatar className="stat-icon">{stat.icon}</Avatar>
                    <div className="stat-text">
                      <Typography component="h3" className="stat-value">
                        {stat.value}
                      </Typography>
                      <Typography className="stat-label">
                        {stat.label}
                      </Typography>
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
                <Typography component="h2" className="section-title">
                  Mis Clases
                </Typography>
                <List className="classes-list">
                  {classes.map((classItem, index) => (
                    <ListItem key={index} className="class-item">
                      <ListItemIcon className="class-icon">
                        <ClassIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={classItem.name}
                        className="class-name"
                      />
                    </ListItem>
                  ))}
                </List>
              </CardContent>
            </Card>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                background: "linear-gradient(45deg, #FFA500 30%, #FF6B6B 90%)",
                color: "white",
              }}
              onClick={handleCreate}
            >
              Create New Class
            </Button>
            <CreateClassPopup
              updateClasses={triggerRefresh}
              open={open}
              onClose={() => setOpen(false)}
              currentUser={user}
              allStudents={allStudents}
              style={{ zIndex: 9999 }}
            />
          </div>
        </section>
      </main>
    </div>
  );
};

export default Teacher;
