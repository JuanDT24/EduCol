//Imports with dependencies
const Connection = require('../database_connection.js');
const { ObjectId } = require('mongodb');
class courseController {
    static async getDB() {
    if (!this.db) {
      this.db = await Connection.connect();
    }
    return this.db;
  }
    static async createCourse(courseName, courseGrading, courseTeacherName) {
  const db = await this.getDB();
  
  if (typeof courseGrading !== 'object' || Array.isArray(courseGrading) || courseGrading === null) {
    throw new Error('Grading must be a valid object');
  }
  
  const gradingWeights = Object.values(courseGrading);
  
  // Verify that weights are numbers
  const allNumbers = gradingWeights.every(val => typeof val === 'number' && !isNaN(val));
  if (!allNumbers) {
    throw new Error('All grading weights must be numbers');
  }
  
  const sumGrades = gradingWeights.reduce((acc, val) => acc + val, 0);
  if (Math.abs(sumGrades - 1) > 0.00001) {
    throw new Error('Grading weights must add up to 1');
  }
  
  const teacher = await db.collection('users').findOne({ username: courseTeacherName });
  if (!teacher || teacher.isTeacher !== true) {
    throw new Error('User must be a teacher to create courses');
  }
  
  const result = await db.collection('courses').insertOne({
    name: courseName,
    gradingScheme: courseGrading,
    teacherID: teacher._id
  });
  
  await db.collection('users').updateOne(
    { _id: teacher._id },
    { $push: { courses: result.insertedId } }
  );
  
  return result;
}
    static async addStudent(studentName, courseId){
        const db = await this.getDB();
        const student = await db.collection('users').findOne({username: studentName})
        if(!student){
            throw new Error('Could not find student by username ' + studentName)
        }
        const courseObjectId = new ObjectId(courseId);
        // Add course to student
        const course = await db.collection('courses').findOne({_id: courseObjectId});
        if (!course) {
            throw new Error('Course not found');
        }
        await db.collection('courses').updateOne(
        { _id: courseObjectId },
        { $addToSet: { students: student._id } } // ✅ evita duplicados, crea array si no existe
        );

        // Add course to student's courses array
        await db.collection('users').updateOne(
        { _id: student._id },
        { $addToSet: { courses: courseObjectId } }
        );
        
    }
}

module.exports = courseController