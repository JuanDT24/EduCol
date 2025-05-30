//Imports with dependencies
const Connection = require('./database_connection.js');
const bcrypt = require('bcrypt');
var validator = require("email-validator");
class UserController {
    static async createUser (userEmail, userName, userPassword, isTeacher){

        // Email Validation
        if (!validator.validate(userEmail)) throw new Error('Email is not valid');
        const db = await Connection.connect()
        var user = await db.collection('users').findOne({email: userEmail})
        if(user) throw new Error('Email is already registered');
        // User validation
        user = await db.collection('users').findOne({username: userName})
        if(user) throw new Error('Username already exists')
        // Password hashing
        // hash receives password and number of SALT characters
        const hashedPassword = await bcrypt.hash(userPassword, 10)
        const isTeacherBool = isTeacher === 'true' || isTeacher === true; // This covers both cases, sent like a string and sent like a bool
        const result = await db.collection('users').insertOne({
            username: userName,
            email: userEmail,
            password: hashedPassword,
            isTeacher: isTeacherBool
        }) 
        return { id: result.insertedId, username: userName };
    }
    static async login(userEmail, userPassword){
        const db = await Connection.connect()
        const user = await db.collection('users').findOne({email: userEmail})
        if(!user) throw new Error('User does not exist')
        if(await bcrypt.compare(userPassword, user.password)){
            return user;
        }else{
            throw new Error('Incorrect password')
        }
    }
    static async getCoursesByName(userName){
        const db = await Connection.connect()
        const user = await db.collection('users').findOne({username: userName})
        if(!user) throw new Error('User does not exist')
        if (!Array.isArray(user.courses) || user.courses.length === 0) {
        throw new Error('User has no courses');
        }

        const courses = await db.collection('courses')
        .find({ _id: { $in: user.courses } }) // busca todos los cursos por _id
        .toArray();
        return courses;


    }
}
module.exports = UserController