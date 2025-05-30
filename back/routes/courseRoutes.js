// Dependencies
const express = require('express');
const courseController = require('../controllers/courseController.js')




// Router definition
const router = express.Router();
// Endpoints

router.post('/createCourse', async (req, res) =>{
    try{
    const {course_name, grading_scheme, teacher_name} = req.body
    await courseController.createCourse(course_name, grading_scheme, teacher_name)
    res.status(201).json({ message: "Curso creado correctamente" });
    }catch(error){
    res.status(400).json({error: "No se pudo crear el curso " + error.message})
    console.error(error)
    }
})
router.post('/addStudent', async (req, res) => {
    try{
    const {username, courseID} = req.body;
    await courseController.addStudent(username, courseID);
    res.status(200).json({ message: "Estudiante agregado correctamente al curso." });
    }catch(error){
    res.status(400).json({error: "No se pudo agregar el estudiante al curso " + error.message})
    console.error(error);
    }
})

//Export
module.exports = router;