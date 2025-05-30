import React from "react";
import Login from "./pages/login/Login";
import Home from "./pages/Home/Home";
import Student from "./pages/student/Student";
import Teacher from "./pages/teacher/Teacher";
import { Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";

function App() {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/student" element={<Student />} />
        <Route path="/teacher" element={<Teacher />} />
      </Routes>
    </UserProvider>
  );
}
export default App;
