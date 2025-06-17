export async function getTweetsApi() {
    const response = await fetch('/api/tweets', {
        method: 'GET',
        headers: {
        'Content-Type': 'application/json',
        
        }
    });
    
    if (!response.ok) {
        throw new Error('Error al obtener los tweets');
    }
    
    return await response.json();
    }
    export async function createTweetApi( { userId, text }) {  
        const response = await fetch('/api/tweets', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify( { userId, text }),
        });
        
        if (!response.ok) {
            throw new Error('Error al crear el tweet');
        }
        
        return await response.json();
    }