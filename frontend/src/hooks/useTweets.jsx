import {getTweetsApi,createTweetApi} from  '@/api/tweets';
export function useTweets() {
    const getTweets = async () => {
        try {
            const response = await getTweetsApi();
            return response;
        } catch (error) {
            console.error('Error al obtener los tweets:', error);
            throw error;
        }
    };
    const createTweet = async ({ userId, text }) => {
        try {
            const response = await createTweetApi({ userId, text });
            return response;
        } catch (error) {
            console.error('Error al crear el tweet:', error);
            throw error;
        }
    };
    return {
        getTweets,
        createTweet
    };
}