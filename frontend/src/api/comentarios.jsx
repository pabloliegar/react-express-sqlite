import { API_URL } from './../config.js';
    export async function getComentarios() {
       // VITE_API_URL=http://192.168.68.51:4000;
         
        const response = await fetch(`${API_URL}/api/comentarios`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error al obtener los comentarios');
        }

        return await response.json();
    }

    export async function createComentario({ userId, text, tweetId }) {
         
        const response = await fetch(`${API_URL}/api/comentarios`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId, text, tweetId }),
        });

        if (!response.ok) {
            throw new Error('Error al crear el comentario');
        }

        return await response.json();
    }

    export async function getComentariosByTweetId(tweetId) {
        
        const response = await fetch(`${API_URL}/api/comentarios/${tweetId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Error al obtener los comentarios por tweet');
        }

        return await response.json();
    }
