/* eslint-disable no-useless-catch */
export async function loginUser(credentials) {
  try {
    const response = await fetch('http://localhost:4000/api/usuarios/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)  // credentials sería { email, contraseña }
    });

    if (!response.ok) {
      // Aquí manejas errores de status HTTP, como 401 o 500
      throw new Error('Error en login: ' + response.statusText);
    }

    const data = await response.json();
    return data; // Devuelve la respuesta del servidor (usuario, token, etc)

  } catch (error) {
    throw error; // Pasamos el error para manejarlo fuera
  }
}
export async function createUser({ nombre, email, contrasena, avatar }) {
  try {
    const response = await fetch('/api/usuarios', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ nombre, email, contrasena, avatar })
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Error al crear el usuario');
    }

    const data = await response.json();
    return data;

  } catch (error) {
    throw error;
  }
}
export async function getMeApi(token){
    try {
     
        const url =`http://localhost:4000/api/usuarios/`
        const params ={
          method: 'GET',
            headers:{
               'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        }
        const response = await fetch(url,params);
        const result = await response.json()
        return result
     } catch (error) {
       throw error 
       
    }
}