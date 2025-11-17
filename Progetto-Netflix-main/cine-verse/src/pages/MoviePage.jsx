import React, { useState, useEffect } from 'react';
import { fetchFromTmdb, ENDPOINTS } from '../api/tmdb'; 
import MovieCard from '../components/MovieCard';
import './HomeStyle.css'; 

const DUMMY_GENRES = {
    28: 'Azione', 12: 'Avventura', 35: 'Commedia', 80: 'Crimine',
    18: 'Drammatico', 53: 'Thriller', 10749: 'Romance', 14: 'Fantasy',
    878: 'Fantascienza', 10752: 'Guerra'
};
const GENRE_ACTION_ID = 28;
const GENRE_COMEDY_ID = 35;


// Componente Section (ORA CORRETTO)
function Section({ title, movies, showMore, setShowMore }) { 
    
    const displayed = showMore ? movies : movies.slice(0, 6);
    
    // Aggiunto un controllo per il caricamento o dati mancanti
    if (!movies || movies.length === 0) {
        return (
            <div className="mb-5 px-3">
                <h2 className="text-white mb-3">{title}</h2>
                <p className="text-secondary">Caricamento in corso o nessun film trovato.</p>
            </div>
        );
    }
    
    return (
        <div className="mb-5 px-3">
            <h2 className="text-white mb-3">{title}</h2>
            <div className="row g-3">
                {displayed.map(movie => (
                    <div key={movie.id} className="col-6 col-sm-4 col-md-3 col-lg-2">
                        {/* ✅ CORREZIONE: Passo l'oggetto movie completo */}
                        <MovieCard movie={movie} /> 
                    </div>
                ))}
            </div>
            <div className="text-center mt-3">
                {movies.length > 6 && (
                    <button
                        className="btn btn-outline-light btn-sm"
                        onClick={() => setShowMore(prev => !prev)}
                    >
                        {showMore ? "Mostra meno" : "Mostra altri"}
                    </button>
                )}
            </div>
        </div>
    );
}

// =========================================================

export default function MoviesPage() {
    const [trendingAction, setTrendingAction] = useState([]);
    const [topRatedComedy, setTopRatedComedy] = useState([]);
    const [cineVerseOriginals, setCineVerseOriginals] = useState([]); 

    const [showMoreAction, setShowMoreAction] = useState(false);
    const [showMoreComedy, setShowMoreComedy] = useState(false);
    const [showMoreOriginals, setShowMoreOriginals] = useState(false);

    useEffect(() => {
        const loadMovies = async () => {
            
            // Le chiamate API rimangono invariate.
            const trendAction = await fetchFromTmdb(ENDPOINTS.discoverMovies, {
                sort_by: 'popularity.desc', 
                with_genres: GENRE_ACTION_ID 
            });

            const topComedy = await fetchFromTmdb(ENDPOINTS.discoverMovies, {
                sort_by: 'vote_average.desc',
                'vote_count.gte': 100, 
                with_genres: GENRE_COMEDY_ID 
            });

            const originals = await fetchFromTmdb(ENDPOINTS.upcomingMovies);
            
            setTrendingAction(trendAction.results || []);
            setTopRatedComedy(topComedy.results || []);
            setCineVerseOriginals(originals.results || []);
        };

        loadMovies();
    }, []);

    return (
        <div className="container-fluid pt-5" style={{ backgroundColor: "#141414", minHeight: "100vh" }}>
            <h1 className="text-white text-center mb-5 pt-3">Catalogo Film</h1>
            
            <Section
                title="✨ Solo su CineVerse"
                movies={cineVerseOriginals}
                showMore={showMoreOriginals}
                setShowMore={setShowMoreOriginals}
            />

            <Section
                title="🔥 In Tendenza: Azione"
                movies={trendingAction}
                showMore={showMoreAction}
                setShowMore={setShowMoreAction}
            />
            
            <Section
                title="⭐ Più Votati: Commedia"
                movies={topRatedComedy}
                showMore={showMoreComedy}
                setShowMore={setShowMoreComedy}
            />
        </div>
    );
}