const API_KEY = "4e6c24759d6bacacc8b69a032480180c"; 
const BASE_URL = "https://api.themoviedb.org/3";

export const ENDPOINTS = {
    popularMovies: "/movie/popular",
    topRated: "/movie/top_rated",
    trending: "/trending/movie/week",
    upcomingMovies: "/movie/upcoming",
    discoverMovies: "/discover/movie",
    
    popularTV: "/tv/popular",
    topRatedTV: "/tv/top_rated",
    trendingTV: "/trending/tv/week",
    discoverTV: "/discover/tv",
    onTheAir: "/tv/on_the_air"
};

export const TV_GENRE_IDS = {
    azione: 10759,
    commedia: 35
};

export const fetchFromTmdb = async (endpoint, params = {}) => {
    try {
        
        const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
        
        const url = new URL(`${BASE_URL}/${cleanEndpoint}`);
        url.searchParams.append("api_key", API_KEY);
        url.searchParams.append("language", "it-IT");

        Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));

        const response = await fetch(url);

        
        if (response.status === 404) {
            console.warn(`Risorsa non trovata (404): ${cleanEndpoint}`);
            return null;
        }

        if (!response.ok) {
            throw new Error(`Errore HTTP ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error("Errore fetchFromTmdb:", error);
        return null;
    }
};