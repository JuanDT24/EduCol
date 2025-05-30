import React, { useState } from "react";
import {
  Box,
  DialogActions,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  IconButton,
  TextField,
  Chip,
} from "@mui/material";
import {
  Class as ClassIcon,
  Close as CloseIcon,
  People as PeopleIcon,
  Add as AddIcon,
  Search as SearchIcon,
} from "@mui/icons-material";

const ClassesPopup = () => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [classes, setClasses] = useState([
    { id: 1, name: "Algebra 101", code: "MATH101", students: 24, active: true },
    { id: 2, name: "Chemistry", code: "CHEM202", students: 18, active: true },
    {
      id: 3,
      name: "World History",
      code: "HIST105",
      students: 15,
      active: false,
    },
    { id: 4, name: "Literature", code: "LIT201", students: 22, active: true },
  ]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const filteredClasses = classes.filter(
    (cls) =>
      cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      {/* Trigger Button */}
      <Button
        variant="contained"
        startIcon={<ClassIcon />}
        onClick={handleOpen}
        sx={{
          background: "linear-gradient(45deg, #FFA500 30%, #FF6B6B 90%)",
          color: "white",
          fontWeight: "bold",
          py: 1.5,
          px: 3,
          "&:hover": {
            background: "linear-gradient(45deg, #FF8C00 30%, #FF6347 90%)",
          },
        }}
      >
        Mis clases
      </Button>

      {/* Classes Popup */}
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            p: 1,
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            background: "linear-gradient(90deg, #FFA50010 0%, #FF6B6B10 100%)",
          }}
        >
          <Typography variant="h6" fontWeight="bold">
            Mis clases
          </Typography>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          {/* Search Bar */}
          <TextField
            fullWidth
            variant="outlined"
            placeholder="Buscar clases"
            InputProps={{
              startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
            }}
            sx={{ mb: 3, mt: 1 }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          {/* Classes Grid */}
          <Grid container spacing={3}>
            {filteredClasses.map((cls) => (
              <Grid item xs={12} sm={6} md={4} key={cls.id}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderLeft: "4px solid",
                    borderColor: cls.active ? "success.main" : "grey.500",
                    "&:hover": {
                      boxShadow: "0 4px 20px rgba(255, 107, 107, 0.15)",
                    },
                  }}
                >
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Box
                      sx={{ display: "flex", alignItems: "center", mb: 1.5 }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: cls.active ? "primary.light" : "grey.300",
                          color: cls.active ? "primary.main" : "grey.600",
                          mr: 2,
                        }}
                      >
                        <ClassIcon />
                      </Avatar>
                      <Box>
                        <Typography variant="h6">{cls.name}</Typography>
                        <Typography variant="body2" color="text.secondary">
                          {cls.code}
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                      <PeopleIcon
                        fontSize="small"
                        color="action"
                        sx={{ mr: 1 }}
                      />
                      <Typography variant="body2">
                        {cls.students} Estudiantes
                      </Typography>
                    </Box>

                    <Chip
                      label={cls.active ? "Activa" : "Inactiva"}
                      size="small"
                      color={cls.active ? "success" : "default"}
                      sx={{ mt: 2 }}
                    />
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {filteredClasses.length === 0 && (
            <Typography
              variant="body1"
              color="text.secondary"
              align="center"
              sx={{ py: 4 }}
            >
              No se encontraron clases que coincidan con tu búsqueda.
            </Typography>
          )}
        </DialogContent>

      </Dialog>
    </>
  );
};

export default ClassesPopup;
