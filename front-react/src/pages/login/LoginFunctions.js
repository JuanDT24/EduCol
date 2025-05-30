export const addUser = async (userData) => {
  // Sending user data to database
  try {
    const response = await fetch("http://localhost:5000/api/registerUser", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Adding necessary values that aren't asked in the form
      body: JSON.stringify(userData),
    });
    // Sending response to console
    console.log(response);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error al crear usuario", error);
    return { error: "No se pudo crear el usuario" };
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await fetch("http://localhost:5000/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userData.email,
        password: userData.password,
      }),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    return { message: "No se pudo inciar sesión ", error };
  }
};
