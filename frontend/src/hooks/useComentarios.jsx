import {getComentarios, createComentario, getComentariosByTweetId} from '@/api/comentarios';
export function useComentarios() {
    const getcomentarios = async () => {
        try {
            const response = await getComentarios();
            return response;
        } catch (error) {
            console.error('Error al obtener los comentarios:', error);
            throw error;
        }
    };

    const createcomentario = async ({ userId, text, tweetId }) => {
        try {
            const response = await createComentario({ userId, text, tweetId });
            return response;
        } catch (error) {
            console.error('Error al crear el comentario:', error);
            throw error;
        }
    };

    const getComentariosByTweeid = async (tweetId) => {
        try {
            const response = await getComentariosByTweetId(tweetId);
            return response;
        } catch (error) {
            console.error('Error al obtener los comentarios por tweet:', error);
            throw error;
        }
    };

    return {
        getcomentarios,
        createcomentario,
        getComentariosByTweeid
    };
}