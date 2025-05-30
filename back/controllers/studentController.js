//Imports with dependencies
const Connection = require('../database_connection.js');
const { ObjectId } = require('mongodb');
class studentController {
    static async getDB() {
    if (!this.db) {
      this.db = await Connection.connect();
    }
    return this.db;
  }
  static async getStudentById(studentId) {
    const db = await this.getDB();
    const studentIdObject = new ObjectId(studentId);
    const student = await db.collection('users').findOne({ _id: studentIdObject });
    // Check if student exists
     if (!student) {
      throw new Error('Estudiante no encontrado');
    }
    // Check if the user is a teacher
    if(student.isTeacher) {
      throw new Error('Esto es un profesor, no un estudiante');
    }
   
    return student;
  }
  static async getStudentByUsername(studentName) {
    const db = await this.getDB();
    const student = await db.collection('users').findOne({ username: studentName});
    // Check if student exists
     if (!student) {
      throw new Error('Estudiante no encontrado');
    }
    // Check if the user is a teacher
    if(student.isTeacher) {
      throw new Error('Esto es un profesor, no un estudiante');
    }
   
    return student;
  }

}

module.exports = studentController