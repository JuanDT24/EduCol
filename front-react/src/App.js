import React from 'react';
import Login from './pages/login/Login';
import Home from './pages/Home/Home'
import Student from './pages/student/Student';
import Teacher from './pages/teacher/Teacher';
import { Router, Routes, Route } from 'react-router-dom';

function App() {
    return(
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/student" element={<Student/>}/>
            <Route path="/teacher" element={<Teacher/>}/>
        </Routes>
    )
}
export default App;
