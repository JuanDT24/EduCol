// Dependencies
const express = require('express');
const teacherController = require('../controllers/teacherController.js')



// Router definition
const router = express.Router();
// Endpoints

router.get('/get_teacher_by_id/:id', async (req, res) => {
    try {
        const teacher_id = req.params.id;
        const teacher = await teacherController.getTeacherById(teacher_id);
        res.status(200).json(teacher);
    } catch (error) {
        res.status(400).json({ error: "No se pudo obtener el maestro: " + error.message });
        console.error(error);
    }
});
router.get('/get_teacher_by_username/:username', async (req, res) => {
    try {
        const teacher_username = req.params.username;
        const teacher = await teacherController.getTeacherByUsername(teacher_username);
        res.status(200).json(teacher);
    } catch (error) {
        res.status(400).json({ error: "No se pudo obtener el maestro: " + error.message });
        console.error(error);
    }
});
//Export
module.exports = router;