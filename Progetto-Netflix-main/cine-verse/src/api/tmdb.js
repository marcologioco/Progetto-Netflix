const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// CHIAVE API 
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
            const errorData = await response.json();
            console.error("ERRORE TMDB (Verifica la chiave API!):", errorData);
            throw new Error(`Errore HTTP ${response.status}: ${errorData.status_message}`);
        }

        const data = await response.json();
        return data;

    } catch (error) {
        console.error("Errore generico durante il fetch:", error);
        return { results: [] };
    }
};

// ENDPOINT TMDB
export const ENDPOINTS = {
    popularMovies: 'movie/popular',
    topRated: 'movie/top_rated',
    trending: 'trending/movie/week',
};
