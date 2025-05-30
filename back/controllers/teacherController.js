//Imports with dependencies
const Connection = require('../database_connection.js');
const { ObjectId } = require('mongodb');

// Controller for teacher-related operations
class teacherController { 
    static async getDB() {
    if (!this.db) {
      this.db = await Connection.connect();
    }
    return this.db;
  }
  static async getTeacherById(TeacherId) {
    const db = await this.getDB();
    const TeacherIdObject = new ObjectId(TeacherId);
    const teacher = await db.collection('users').findOne({ _id: TeacherIdObject });
    // Check if student exists
     if (!teacher) {
      throw new Error('Maestro no encontrado');
    }
    // Check if the user is a teacher
    if(!teacher.isTeacher) {
      throw new Error('Esto es estudiante, no un profesor');
    }
    return teacher;
  }
  static async getTeacherByUsername(TeacherName) {
    const db = await this.getDB();
    const teacher = await db.collection('users').findOne({ username: TeacherName});
    // Check if student exists
     if (!teacher) {
      throw new Error('Maestro no encontrado');
    }
    // Check if the user is a teacher
    if(!teacher.isTeacher) {
      throw new Error('Esto es un estudiante, no un profesor');
    }
   
    return teacher;
  }
}

module.exports = teacherController