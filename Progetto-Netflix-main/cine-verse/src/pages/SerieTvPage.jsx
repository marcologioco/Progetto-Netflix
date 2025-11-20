import React, { useState, useEffect } from 'react';
import { fetchFromTmdb, ENDPOINTS } from '../api/tmdb';
import MovieCard from '../components/MovieCard';
import GenreSelector from '../components/GenreSelector'; // <--- IMPORT NUOVO
import './homeStyle.css'; 

// CONFIGURAZIONE GENERI SERIE TV (Immagini Aggiornate)
const GENRES_UI = [
    { 
        id: 10759, 
        name: 'Action & Adv', 
        img: 'https://image.tmdb.org/t/p/original/uDgy6hyPd82kOHh6I95FLtLnj6p.jpg' // The Last of Us
    },
    { 
        id: 10765, 
        name: 'Sci-Fi & Fant', 
        img: 'https://image.tmdb.org/t/p/original/jBJWaqoSCiARWtfV0GlqHrcdidd.jpg' // The Witcher
    },
    { 
        id: 35, 
        name: 'Sitcoms', 
        img: 'https://image.tmdb.org/t/p/original/qWnJzyZhyy74gjpSjIXWmuk0ifX.jpg' // The Office
    },
    { 
        id: 80, 
        name: 'Crime', 
        img: 'https://image.tmdb.org/t/p/original/rSPw7tgCH9c6NqICZef4kZjFOQ5.jpg' // Narcos
    },
    { 
        id: 18, 
        name: 'Drama', 
        img: 'https://image.tmdb.org/t/p/original/oaGvjB0DvdhXhOAuADfHb261ZHa.jpg' // Squid Game
    },
    { 
        id: 16, 
        name: 'Animazione', 
        img: 'https://image.tmdb.org/t/p/original/6UH52Fmau8RPsMAbQbjwN3wJSCj.jpg' // Invincible
    },
];

function Section({ title, movies, showMore, setShowMore }) { 
    const displayed = showMore ? movies : movies.slice(0, 6);
    if (!movies || movies.length === 0) return null;
    return (
        <div className="mb-5 px-3">
            <h2 className="text-white mb-3 fw-bold">{title}</h2>
            <div className="row g-3">
                {displayed.map(movie => (
                    <div key={movie.id} className="col-6 col-sm-4 col-md-3 col-lg-2">
                        <MovieCard movie={{...movie, title: movie.name, release_date: movie.first_air_date}} /> 
                    </div>
                ))}
            </div>
            <div className="text-center mt-4">
                {movies.length > 6 && (
                    <button className="btn btn-outline-secondary btn-sm px-4" onClick={() => setShowMore(prev => !prev)}>
                        {showMore ? "Mostra meno" : "Vedi altri"}
                    </button>
                )}
            </div>
        </div>
    );
}

export default function SerieTvPage() {
    const [popularTV, setPopularTV] = useState([]);
    const [trendingTV, setTrendingTV] = useState([]);
    const [topRatedActionTV, setTopRatedActionTV] = useState([]);
    const [topRatedComedyTV, setTopRatedComedyTV] = useState([]);
    
    const [showMorePop, setShowMorePop] = useState(false);
    const [showMoreTrend, setShowMoreTrend] = useState(false);
    const [showMoreAction, setShowMoreAction] = useState(false);
    const [showMoreComedy, setShowMoreComedy] = useState(false);

    const [selectedGenre, setSelectedGenre] = useState(null);
    const [filteredSeries, setFilteredSeries] = useState([]);
    const [isLoadingFilter, setIsLoadingFilter] = useState(false);

    useEffect(() => {
        const loadTvShows = async () => {
            try {
                const popular = await fetchFromTmdb(ENDPOINTS.popularTV);
                const trending = await fetchFromTmdb(ENDPOINTS.trendingTV);
                const endpointDiscover = ENDPOINTS.discoverTV || '/discover/tv';
                
                const topAction = await fetchFromTmdb(endpointDiscover, { sort_by: 'vote_average.desc', 'vote_count.gte': 100, with_genres: 10759 });
                const topComedy = await fetchFromTmdb(endpointDiscover, { sort_by: 'vote_average.desc', 'vote_count.gte': 100, with_genres: 35 });
                
                setPopularTV(popular.results || []);
                setTrendingTV(trending.results || []);
                setTopRatedActionTV(topAction.results || []);
                setTopRatedComedyTV(topComedy.results || []);
            } catch (error) { console.error(error); }
        };
        loadTvShows();
    }, []);

    const handleGenreClick = async (genreId) => {
        if (selectedGenre === genreId) {
            setSelectedGenre(null);
            setFilteredSeries([]);
            return;
        }
        setSelectedGenre(genreId);
        setIsLoadingFilter(true);
        const endpointDiscover = ENDPOINTS.discoverTV || '/discover/tv';
        const data = await fetchFromTmdb(endpointDiscover, { with_genres: genreId, sort_by: 'popularity.desc' });
        setFilteredSeries(data.results || []);
        setIsLoadingFilter(false);
    };

    return (
        <div className="container-fluid pt-5" style={{ backgroundColor: "#141414", minHeight: "100vh" }}>
            
            <h1 className="text-white text-center mb-4 pt-4 fw-bold" style={{ fontFamily: 'Oswald, sans-serif', fontSize: '3rem' }}>
                Catalogo Serie TV
            </h1>

            {/* UTILIZZO DEL COMPONENTE RIUTILIZZABILE */}
            <GenreSelector 
                genres={GENRES_UI} 
                selectedGenre={selectedGenre} 
                onSelect={handleGenreClick} 
            />
            
            {selectedGenre ? (
                <div className="container-fluid px-3 fade-in-up">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className="text-white m-0">
                            Risultati: <span className="text-danger fw-bold">{GENRES_UI.find(g => g.id === selectedGenre)?.name}</span>
                        </h2>
                        <button className="btn btn-sm btn-outline-light" onClick={() => setSelectedGenre(null)}>✕ Chiudi Filtro</button>
                    </div>
                    {isLoadingFilter ? (
                        <div className="text-white text-center py-5"><div className="spinner-border text-danger"></div></div>
                    ) : (
                        <div className="row g-3">
                            {filteredSeries.map(serie => (
                                <div key={serie.id} className="col-6 col-sm-4 col-md-3 col-lg-2">
                                    <MovieCard movie={{...serie, title: serie.name, release_date: serie.first_air_date}} /> 
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                <div className="fade-in-up">
                    <Section title="🔥 Solo su CineVerse" movies={popularTV} showMore={showMorePop} setShowMore={setShowMorePop} />
                    <Section title="✨ In Tendenza (Settimanale)" movies={trendingTV} showMore={showMoreTrend} setShowMore={setShowMoreTrend} />
                    <Section title="💥 Più Votate: Azione & Avventura" movies={topRatedActionTV} showMore={showMoreAction} setShowMore={setShowMoreAction} />
                    <Section title="🤣 Più Votate: Sitcom & Comedy" movies={topRatedComedyTV} showMore={showMoreComedy} setShowMore={setShowMoreComedy} />
                </div>
            )}
            <div className="pb-5"></div>
        </div>
    );
}