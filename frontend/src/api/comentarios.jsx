
    export async function getComentarios() {
        const response = await fetch('/api/comentarios', {
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
        const response = await fetch('/api/comentarios', {
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
        const response = await fetch(`/api/comentarios/${tweetId}`, {
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
