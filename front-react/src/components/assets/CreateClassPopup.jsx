import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Box,
  Chip,
  Grid,
  Slider,
  IconButton,
  InputAdornment,
  Card,
  CardContent,
  Avatar,
  Checkbox,
  Divider
} from '@mui/material';
import {
  Close as CloseIcon,
  Add as AddIcon,
  Delete as DeleteIcon,
  Search as SearchIcon,
  Person as PersonIcon
} from '@mui/icons-material';
import { useUser } from '../../contexts/UserContext';
import { createClass, addStudentToClass} from '../../pages/teacher/TeacherFunctions.js'; // Asegúrate de que esta ruta sea correcta
import { data } from 'react-router-dom';

const CreateClassDialog = ({ open, onClose, currentUser, allStudents = [], updateClasses }) => {
  const [classData, setClassData] = useState({
    course_name: '',
    grading_scheme: [
      { name: 'Exámenes', percentage: 40 },
      { name: 'Tareas', percentage: 30 },
      { name: 'Participación', percentage: 30 }
    ],
    teacher_name: currentUser?.username || '',
    students: []
  });
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const {user} = useUser();

  // Actualizar teacher_name cuando cambie currentUser
  useEffect(() => {
    if (currentUser?.username) {
      setClassData(prev => ({
        ...prev,
        teacher_name: currentUser.username
      }));
    }
  }, [currentUser]);

  const handleInputChange = (field, value) => {
    setClassData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleGradingSchemeChange = (index, value) => {
    const newScheme = [...classData.grading_scheme];
    newScheme[index].percentage = parseInt(value);
    
    setClassData(prev => ({
      ...prev,
      grading_scheme: newScheme
    }));
  };

  const addGradingItem = () => {
    const newScheme = [...classData.grading_scheme, { name: 'Nuevo item', percentage: 0 }];
    setClassData(prev => ({
      ...prev,
      grading_scheme: newScheme
    }));
  };

  const removeGradingItem = (index) => {
    const newScheme = classData.grading_scheme.filter((_, i) => i !== index);
    setClassData(prev => ({
      ...prev,
      grading_scheme: newScheme
    }));
  };

  const updateGradingItemName = (index, name) => {
    const newScheme = [...classData.grading_scheme];
    newScheme[index].name = name;
    setClassData(prev => ({
      ...prev,
      grading_scheme: newScheme
    }));
  };

  const totalPercentage = classData.grading_scheme.reduce((sum, item) => sum + item.percentage, 0);


  const toggleStudentSelection = (student) => {
    const isSelected = selectedStudents.some(s => s.username === student.username);
    if (isSelected) {
      setSelectedStudents(prev => prev.filter(s => s.username !== student.username));
    } else {
      setSelectedStudents(prev => [...prev, student]);
    }
  };

  const addSelectedStudents = () => {
    const studentUsernames = selectedStudents.map(s => s.username);
    setClassData(prev => ({
      ...prev,
      students: [...new Set([...prev.students, ...studentUsernames])]
    }));
    setSelectedStudents([]);
    setSearchTerm('');
  };

  const removeStudent = (username) => {
    setClassData(prev => ({
      ...prev,
      students: prev.students.filter(s => s !== username)
    }));
  };

  const filteredStudents = allStudents.filter(student =>
    student.username.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !classData.students.includes(student.username)
  );

  const handleCreateClass = () => {
    console.log('Datos de la clase:', classData);
    const gradingSchemeObject = {};
    classData.grading_scheme.forEach(item => {
      gradingSchemeObject[item.name] = item.percentage / 100; // Convertir porcentaje a decimal
    });
    const dataToSend = {
      course_name: classData.course_name,
      grading_scheme: gradingSchemeObject,
      teacher_name: classData.teacher_name,
      students: classData.students
    };

    const addStudent = async(students) =>{
      for (const student of students) {
        const response = await addStudentToClass({ student_name: student, course_id: dataToSend.course_id });
        if (response && !response.error) {
          console.log(`Estudiante ${student} agregado exitosamente a la clase.`);
        } else {
          console.error(`Error al agregar estudiante ${student}:`, response?.error);
        }
      }
    }

    const CreateClass= async()=>{
      const response = await createClass(dataToSend);
      console.log('Response from createClass:', response);
      if (response && !response.error) {
        console.log('Clase creada exitosamente:', response);
        dataToSend.course_id = response.courseId; 
        addStudent(classData.students);
        console.log('dataTosend:', dataToSend);
      } else {
        console.error('Error al crear la clase:', response?.error);
      }
    }

    CreateClass();
    handleClose();
  };

  const handleClose = () => {
    // Reset form
    setClassData({
      course_name: '',
      grading_scheme: [
        { name: 'Exámenes', percentage: 40 },
        { name: 'Tareas', percentage: 30 },
        { name: 'Participación', percentage: 30 }
      ],
      teacher_name: currentUser?.username || '',
      students: []
    });
    setSelectedStudents([]);
    setSearchTerm('');
    updateClasses();
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="lg"
      fullWidth
      PaperProps={{
        sx: { minHeight: '80vh', maxHeight: '90vh' }
      }}
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5" component="div">
            Crear Nueva Clase
          </Typography>
          <IconButton onClick={handleClose} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent dividers sx={{ overflow: 'auto' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, py: 1 }}>
          {/* Nombre del curso */}
          <TextField
            label="Nombre del curso"
            fullWidth
            value={classData.course_name}
            onChange={(e) => handleInputChange('course_name', e.target.value)}
            placeholder="Ingresa el nombre del curso"
            variant="outlined"
          />


          {/* Esquema de calificación */}
          <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
              <Typography variant="h6">
                Esquema de Calificación
              </Typography>
              <Typography 
                variant="body2" 
                color={totalPercentage === 100 ? 'success.main' : 'error.main'}
                fontWeight="medium"
              >
                Total: {totalPercentage}% {totalPercentage !== 100 && '(Debe sumar 100%)'}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {classData.grading_scheme.map((item, index) => (
                <Card key={index} variant="outlined">
                  <CardContent>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12} md={3}>
                        <TextField
                          fullWidth
                          size="small"
                          label="Nombre"
                          value={item.name}
                          onChange={(e) => updateGradingItemName(index, e.target.value)}
                          variant="outlined"
                        />
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <Box sx={{ px: 2 }}>
                          <Typography variant="body2" gutterBottom>
                            Porcentaje: {item.percentage}%
                          </Typography>
                          <Slider
                            value={item.percentage}
                            onChange={(e, value) => handleGradingSchemeChange(index, value)}
                            min={0}
                            max={100}
                            valueLabelDisplay="auto"
                            size="small"
                          />
                        </Box>
                      </Grid>
                      <Grid item xs={12} md={3}>
                        <Button
                          onClick={() => removeGradingItem(index)}
                          disabled={classData.grading_scheme.length <= 1}
                          color="error"
                          size="small"
                          startIcon={<DeleteIcon />}
                          fullWidth
                        >
                          Eliminar
                        </Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              ))}
            </Box>
            
            <Button
              onClick={addGradingItem}
              startIcon={<AddIcon />}
              sx={{ mt: 2 }}
              variant="outlined"
              color="primary"
            >
              Agregar Item
            </Button>
          </Box>

          <Divider />

          {/* Estudiantes */}
          <Box>
            <Typography variant="h6" gutterBottom>
              Estudiantes del Curso
            </Typography>
            
            {/* Estudiantes agregados */}
            {classData.students.length > 0 && (
              <Box mb={2}>
                <Typography variant="body2" gutterBottom>
                  Estudiantes agregados ({classData.students.length}):
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {classData.students.map((username) => (
                    <Chip
                      key={username}
                      label={username}
                      onDelete={() => removeStudent(username)}
                      color="primary"
                      variant="outlined"
                    />
                  ))}
                </Box>
              </Box>
            )}

            {/* Buscador de estudiantes */}
            <TextField
              fullWidth
              placeholder="Buscar estudiantes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 2 }}
            />

            {/* Lista de estudiantes disponibles */}
            <Box 
              sx={{ 
                maxHeight: 300, 
                overflow: 'auto', 
                border: 1, 
                borderColor: 'divider', 
                borderRadius: 1,
                p: 1,
                bgcolor: 'background.default'
              }}
            >
              {filteredStudents.length === 0 ? (
                <Typography 
                  variant="body2" 
                  color="text.secondary" 
                  sx={{ textAlign: 'center', py: 3 }}
                >
                  No se encontraron estudiantes
                </Typography>
              ) : (
                <Grid container spacing={1}>
                  {filteredStudents.map((student) => (
                    <Grid item xs={12} sm={6} md={4} key={student.username}>
                      <Card 
                        variant="outlined"
                        sx={{ 
                          cursor: 'pointer',
                          bgcolor: selectedStudents.some(s => s.username === student.username) 
                            ? 'primary.light' 
                            : 'background.paper',
                          '&:hover': {
                            bgcolor: selectedStudents.some(s => s.username === student.username)
                              ? 'primary.main'
                              : 'action.hover'
                          },
                          transition: 'background-color 0.2s'
                        }}
                        onClick={() => toggleStudentSelection(student)}
                      >
                        <CardContent sx={{ p: 2, '&:last-child': { pb: 2 } }}>
                          <Box display="flex" alignItems="center">
                            <Avatar 
                              sx={{ 
                                bgcolor: 'primary.main', 
                                mr: 1, 
                                width: 32, 
                                height: 32 
                              }}
                            >
                              <PersonIcon fontSize="small" />
                            </Avatar>
                            <Typography variant="body2" sx={{ flexGrow: 1 }}>
                              {student.username}
                            </Typography>
                            <Checkbox
                              checked={selectedStudents.some(s => s.username === student.username)}
                              size="small"
                              sx={{ p: 0 }}
                            />
                          </Box>
                        </CardContent>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
              )}
            </Box>

            {/* Botón para agregar estudiantes seleccionados */}
            {selectedStudents.length > 0 && (
              <Button
                onClick={addSelectedStudents}
                fullWidth
                variant="contained"
                startIcon={<AddIcon />}
                sx={{ mt: 2 }}
              >
                Agregar {selectedStudents.length} estudiante{selectedStudents.length > 1 ? 's' : ''}
              </Button>
            )}
          </Box>
        </Box>
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={handleClose} color="inherit" size="large">
          Cancelar
        </Button>
        <Button
          onClick={handleCreateClass}
          disabled={!classData.course_name || totalPercentage !== 100}
          variant="contained"
          size="large"
        >
          Crear Curso
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateClassDialog;