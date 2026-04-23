import { API_URL } from './../config.js';

export async function loginUser(credentials) {
  const response = await fetch(`${API_URL}/api/usuarios/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials)
  });
  if (!response.ok) throw new Error('Error en login: ' + response.statusText);
  return await response.json();
}

export async function createUser({ nombre, email, contrasena, avatar }) {
  const response = await fetch(`${API_URL}/api/usuarios`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ nombre, email, contrasena, avatar })
  });
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.error || 'Error al crear el usuario');
  }
  return await response.json();
}

export async function getMeApi(token) {
  const response = await fetch(`${API_URL}/api/usuarios/`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  });
  return await response.json();
}
export async function deleteUserApi(token) {
  const response = await fetch(`${API_URL}/api/usuarios/delete`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ id: token }) // Enviamos el token en el cuerpo de la solicitud
  });
  return await response.json();
}

