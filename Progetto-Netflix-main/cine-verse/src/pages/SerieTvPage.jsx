import React, { useState, useEffect } from 'react';
// Assicurati che TV_GENRE_IDS sia correttamente esportato da tmdb.js
import { fetchFromTmdb, ENDPOINTS, TV_GENRE_IDS } from '../api/tmdb';
import MovieCard from '../components/MovieCard';
import './HomeStyle.css'; 

// Definizioni complete dei generi (per tradurre gli ID correttamente)
const DUMMY_GENRES = {
    // Generi Film e TV
    28: 'Azione', 12: 'Avventura', 35: 'Commedia', 80: 'Crimine',
    18: 'Drammatico', 53: 'Thriller', 10749: 'Romance', 14: 'Fantasy',
    878: 'Fantascienza', 10752: 'Guerra', 
    10759: 'Azione & Avventura', 16: 'Animazione', 10765: 'Sci-Fi & Fantasy', 
    10768: 'Guerra & Politica', 99: 'Documentario', 10762: 'Bambini',
};


// Componente Section: Riutilizza la logica della card e del "Mostra altri"
function Section({ title, movies, showMore, setShowMore }) { 
    // Mostra solo i primi 6 elementi se showMore è false
    const displayed = showMore ? movies : movies.slice(0, 6);
    
    // Mostra un messaggio di caricamento o di assenza di dati
    if (!movies || movies.length === 0) {
        return (
            <div className="mb-5 px-3">
                <h2 className="text-white mb-3">{title}</h2>
                <p className="text-secondary">Caricamento in corso o nessuna serie TV trovata. (Controlla la console per errori API)</p>
            </div>
        );
    }
    
    return (
        <div className="mb-5 px-3">
            <>
                <h2 className="text-white mb-3">{title}</h2>

                <div className="row g-3">
                    {displayed.map(tvShow => (
                        <div key={tvShow.id} className="col-6 col-sm-4 col-md-3 col-lg-2">
                            {/* ✅ CORREZIONE CHIAVE: Passo l'oggetto completo come 'movie' */}
                            {/* MovieCard gestirà i campi 'name' e 'title' internamente */}
                            <MovieCard movie={tvShow} /> 
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
            </>
        </div>
    );
}


export default function TvShowsPage() {
    const [popularTV, setPopularTV] = useState([]);
    const [trendingTV, setTrendingTV] = useState([]);
    const [topRatedActionTV, setTopRatedActionTV] = useState([]);
    const [topRatedComedyTV, setTopRatedComedyTV] = useState([]);
    
    const [showMorePop, setShowMorePop] = useState(false);
    const [showMoreTrend, setShowMoreTrend] = useState(false);
    const [showMoreAction, setShowMoreAction] = useState(false);
    const [showMoreComedy, setShowMoreComedy] = useState(false);

    useEffect(() => {
        const loadTvShows = async () => {
            try {
                // 1. SERIE TV POPOLARI (ALIAS "Solo su CineVerse")
                const popular = await fetchFromTmdb(ENDPOINTS.popularTV);

                // 2. SERIE TV IN TENDENZA
                const trending = await fetchFromTmdb(ENDPOINTS.trendingTV);
                
                // 3. PIÙ VOTATE AZIONE (usa discoverTV con ID Azione/Avventura)
                const topAction = await fetchFromTmdb(ENDPOINTS.discoverTV, {
                    sort_by: 'vote_average.desc',
                    'vote_count.gte': 100, 
                    with_genres: TV_GENRE_IDS.azione,
                });

                // 4. PIÙ VOTATE COMMEDIA (usa discoverTV con ID Commedia)
                const topComedy = await fetchFromTmdb(ENDPOINTS.discoverTV, {
                    sort_by: 'vote_average.desc',
                    'vote_count.gte': 100, 
                    with_genres: TV_GENRE_IDS.commedia,
                });
                
                setPopularTV(popular.results || []);
                setTrendingTV(trending.results || []);
                setTopRatedActionTV(topAction.results || []);
                setTopRatedComedyTV(topComedy.results || []);

            } catch (error) {
                console.error("Errore nel caricamento delle Serie TV:", error);
                // Si potrebbe aggiungere una logica per mostrare un messaggio di errore all'utente
            }
        };

        loadTvShows();
    }, []);

    return (
        <div className="container-fluid pt-5" style={{ backgroundColor: "#141414", minHeight: "100vh" }}>
            <h1 className="text-white text-center mb-5 pt-3">Catalogo Serie TV</h1>
            
            {/* SEZIONE 1: SOLO SU CINEVERSE (Popolari) */}
            <Section
                title="🔥 Solo su CineVerse"
                movies={popularTV}
                showMore={showMorePop}
                setShowMore={setShowMorePop}
            />

            {/* SEZIONE 2: IN TENDENZA */}
            <Section
                title="✨ In Tendenza (Settimanale)"
                movies={trendingTV}
                showMore={showMoreTrend}
                setShowMore={setShowMoreTrend}
            />

            {/* SEZIONE 3: PIÙ VOTATE: AZIONE */}
            <Section
                title="💥 Più Votate: Azione"
                movies={topRatedActionTV}
                showMore={showMoreAction}
                setShowMore={setShowMoreAction}
            />

            {/* SEZIONE 4: PIÙ VOTATE: COMMEDIA */}
            <Section
                title="🤣 Più Votate: Commedia"
                movies={topRatedComedyTV}
                showMore={showMoreComedy}
                setShowMore={setShowMoreComedy}
            />
        </div>
    );
}