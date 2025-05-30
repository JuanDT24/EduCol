import React from 'react';
import Login from './pages/login/Login';
import Home from './pages/Home/Home'
import student from './pages/student/Student';
import teacher from './pages/teacher/Teacher';
import { Router, Routes, Route } from 'react-router-dom';

function App() {
    return(
        <Routes>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
        </Routes>
    )
}
export default App;
