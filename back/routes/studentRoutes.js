// Dependencies
const express = require('express');
const studentController = require('../controllers/studentController.js')



// Router definition
const router = express.Router();
// Endpoints

router.get('/get_student_by_id/:id', async (req, res) => {
    try {
        const student_id = req.params.id;
        const student = await studentController.getStudentById(student_id);
        res.status(200).json(student);
    } catch (error) {
        res.status(400).json({ error: "No se pudo obtener el estudiante: " + error.message });
        console.error(error);
    }
});
router.get('/get_student_by_username/:username', async (req, res) => {
    try {
        const student_username = req.params.username;
        const student = await studentController.getStudentByUsername(student_username);
        res.status(200).json(student);
    } catch (error) {
        res.status(400).json({ error: "No se pudo obtener el estudiante: " + error.message });
        console.error(error);
    }
});

//Export
module.exports = router;