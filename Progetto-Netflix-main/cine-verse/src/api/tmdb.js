
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

//CHIAVE API 
const TMDB_API_KEY = '4e6c24759d6bacacc8b69a032480180c'; 

// Funzione riutilizzabile per il fetching
export const fetchFromTmdb = async (endpoint, params = {}) => {
    const defaultParams = {
        api_key: TMDB_API_KEY,
        language: 'it-IT', 
        ...params,
    };

    const queryString = new URLSearchParams(defaultParams).toString();
    const url = `${TMDB_BASE_URL}/${endpoint}?${queryString}`;

    try {
        const response = await fetch(url);
        
        if (!response.ok) {
            // Se la risposta non è OK (es. 401 Unauthorized), 
            // stampiamo l'errore per diagnosticarlo facilmente.
            const errorData = await response.json(); 
            console.error("ERRORE TMDB (Verifica la chiave API!):", errorData);
            throw new Error(`Errore HTTP ${response.status}: ${errorData.status_message}`);
        }
        
        const data = await response.json();
        return data; 
    } catch (error) {
        // Se c'è un errore di rete o un altro problema, viene catturato qui
        console.error("Errore generico durante il fetch:", error);
        // Ritorna un oggetto sicuro ma vuoto per prevenire il crash
        return { results: [] }; 
    }
};

// Endpoint di esempio
export const ENDPOINTS = {
    popularMovies: 'movie/popular',
    // ... altri endpoint
};