import React from "react";
import Topbar from "../../components/assets/Topbar";
import "./Teacher.css";


const Teacher = () =>{

    return (
        <>
        <Topbar topbarItems={[
            { name: "Classes", link: "/teacher/classes" },
            { name: "Assignments", link: "/teacher/assignments" },
            { name: "Grades", link: "/teacher/grades" },

        ]}/>
        <div className="Title">
            <h2>Welcome, Teacher!</h2>
            <p>This is the teacher's dashboard.</p>
        </div>
        <div className="teacher-content">
            {/* Add more teacher-specific content here */}
        </div>
        </>
    );
}

export default Teacher;