//Imports with dependencies
<<<<<<< HEAD
const Connection = require("./database_connection.js");
const bcrypt = require("bcrypt");
var validator = require("email-validator");
class UserController {
  static async createUser(userEmail, userName, userPassword) {
    // Email Validation
    if (!validator.validate(userEmail)) throw new Error("Email is not valid");
    const db = await Connection.connect();
    var user = await db.collection("users").findOne({ email: userEmail });
    if (user) throw new Error("Email is already registered");
    // User validation
    user = await db.collection("users").findOne({ username: userName });
    if (user) throw new Error("Username already exists");
    // Password hashing
    // hash receives password and number of SALT characters
    const hashedPassword = await bcrypt.hash(userPassword, 10);

    await db.collection("users").insertOne({
      username: userName,
      email: userEmail,
      password: hashedPassword,
    });
    return true;
  }
  static async login(userEmail, userPassword) {
    const db = await Connection.connect();
    const user = await db.collection("users").findOne({ email: userEmail });
    if (!user) throw new Error("User does not exist");
    if (await bcrypt.compare(userPassword, user.password)) {
      return {
        id: user._id,
        username: user.username,
      };
    } else {
      throw new Error("Incorrect password");
    }
  }
}
module.exports = UserController;
=======
const Connection = require('./database_connection.js');
const bcrypt = require('bcrypt');
var validator = require("email-validator");
class UserController {
    static async createUser (userEmail, userName, userPassword){
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

        await db.collection('users').insertOne({
            username: userName,
            email: userEmail,
            password: hashedPassword
        }) 
        return true
    }
    static async login(userEmail, userPassword){
        const db = await Connection.connect()
        const user = await db.collection('users').findOne({email: userEmail})
        if(!user) throw new Error('User does not exist')
        if(await bcrypt.compare(userPassword, user.password)){
            return {
                id: user._id,
                username: user.username
            }
        }else{
            throw new Error('Incorrect password')
        }

    }
}
module.exports = UserController
>>>>>>> d59c31104197bdbf4f8e66768a8e1e99c936e040
