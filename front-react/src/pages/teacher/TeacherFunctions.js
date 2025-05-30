export const getTeacherClasses = async (userData) => {
    try {
        const response = await fetch("http://localhost:5000/api/users/getcourses_byusername", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: userData.username }),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al obtener las clases del profesor", error);
        return { error: "No se pudieron obtener las clases del profesor" };
    }
}

export const getStudents = async () => {
    try {
        const response = await fetch("http://localhost:5000/api/users/getstudents", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al obtener los estudiantes", error);
        return { error: "No se pudieron obtener los estudiantes" };
    }
}

export const createClass = async (classData) => {
    try {
        const response = await fetch("http://localhost:5000/api/courses/createCourse", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                course_name: classData.course_name,
                grading_scheme: classData.grading_scheme,
                teacher_name: classData.teacher_name,
            }),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al crear la clase", error);
        return { error: "No se pudo crear la clase" };
    }

}

export const addStudentToClass = async (studentData) => {
    try {
        const response = await fetch("http://localhost:5000/api/courses/addStudent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username: studentData.student_name,
                courseID: studentData.course_id,
            }),
        });
        const data = await response.json();
        return data;
    } catch (error) {
        console.error("Error al agregar estudiante a la clase", error);
        return { error: "No se pudo agregar el estudiante a la clase" };
    }
}