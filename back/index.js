// Dependencies
const express = require('express');
const Connection = require('./database_connection.js');
const bcrypt = require('bcrypt');
const cors = require("cors")
const UserController = require('./UserController.js')
const cookieParser = require('cookie-parser');
const port = process.env.PORT ?? 5000;
const app = express();



// Route imports 
const teacherRoutes = require('./routes/teacherRoutes.js')
const studentRoutes = require('./routes/studentRoutes.js')
const courseRoutes = require('./routes/courseRoutes.js')
// middleware
app.use(cookieParser())
app.use(express.json());
app.use(cors());

//Routes 

app.use('/api/teachers', teacherRoutes)
app.use('/api/students', studentRoutes)
app.use('/api/courses', courseRoutes)
// endpoints
 app.get('/api/users', async (req, res) => {
  const db = await Connection.connect()
  const users = await db.collection('users').find({}).toArray();
  res.json(users)
 });
 app.post('/api/registerUser' , async (req, res) => {
  try {
    await UserController.createUser(req.body.email, req.body.username, req.body.password, req.body.isTeacher)
    res
    .status(201).json({message: 'User created succesfully'})
  } catch (error){
    res.status(400).json({error: error.message})
    console.error(error)
  }
 });
 app.post('/api/login', async (req, res) => {
    // Verifying user
    try{
    const user = await UserController.login(req.body.email, req.body.password)
    res.status(201).json({user})
    }catch(error){
      res.status(500).json({error: error.message})
    }
 });

 app.post('/api/users/getstudents', async (req, res) => {
  try {
    const students = await UserController.getStudents();
    res.status(200).json(students);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.error(error);
  }
 });
 
app.post('/api/users/getcourses_byusername', async (req, res) => {
  try {
    const courses = await UserController.getCoursesByName(req.body.username);
    res.status(200).json(courses);
  } catch (error) {
    res.status(400).json({ error: error.message });
    console.error(error);
  }
 });

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
 });

// Closing connections to avoid connection overload
 process.on('SIGINT', async () => {
  await Connection.close();
  console.log('MongoDB connection closed.');
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await Connection.close();
  console.log('MongoDB connection closed.');
  process.exit(0);
});