const express = require("express");
const Connection = require("./database_connection.js");
const bcrypt = require("bcrypt");
const cors = require("cors");
const UserController = require("./UserController.js");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const port = process.env.PORT ?? 5000;
const app = express();

// middleware
app.use(cookieParser());
app.use(express.json());
app.use(cors());

// endpoints
app.get("/api/users", async (req, res) => {
  const db = await Connection.connect();
  const users = await db.collection("users").find({}).toArray();
  res.json(users);
});

app.post('/api/registerUser' , async (req, res) => {
  try {
    await UserController.createUser(req.body.email, req.body.username, req.body.password, req.body.isTeacher)
    const token = jwt.sign({id:user.id, username:user.username}, process.env.JWT_SECRET, 
      {
        expiresIn: '1h'
      })

      if (!token) {
      return res.status(500).json({ error: "Failed to generate token" });
    }
    res.cookie('access_token', token, {
      httpOnly: true,
      secure: false, // It's ideal to change it to true if the app is in production
      sameSite: 'strict',
      maxAge: 1000 * 60 * 60
    })
    .status(201).json({message: 'User created succesfully'})
  } catch (error){
    res.status(400).json({error: error.message})
    console.error(error)
  }
 });
app.post("/api/login", async (req, res) => {
  // Verifying user
  try {
    const user = await UserController.login(req.body.email, req.body.password);
    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    res.status(200).json({ message: "Logged in succesfully", token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.post("/api/logout", (req, res) => {
  res.clearCookie("access_token").json({ message: "Logged out succesfully" });
});

app.listen(port, () => {
  console.log("Example app listening at http://localhost:${port}");
});

// Closing connections to avoid connection overload
process.on("SIGINT", async () => {
  await Connection.close();
  console.log("MongoDB connection closed.");
  process.exit(0);
});

process.on("SIGTERM", async () => {
  await Connection.close();
  console.log("MongoDB connection closed.");
  process.exit(0);
});
