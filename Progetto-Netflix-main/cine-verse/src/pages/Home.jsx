import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { fetchFromTmdb, ENDPOINTS } from '../api/tmdb.js';
import MovieCard from '../components/MovieCard.jsx';
import { FavoritesContext } from '../context/FavoritesContext.jsx';
import './homeStyle.css'; 
import logoImage from '../assets/logo.png'; 

export default function Home() {
    const navigate = useNavigate(); 
    
    const [popularMovies, setPopularMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [heroMovie, setHeroMovie] = useState(null);

    const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);

    useEffect(() => {
        const loadAll = async () => {
            try {
                const pop = await fetchFromTmdb(ENDPOINTS.popularMovies);
                const top = await fetchFromTmdb(ENDPOINTS.topRated);
                const trend = await fetchFromTmdb(ENDPOINTS.trending);

                setPopularMovies(pop?.results || []);
                setTopRatedMovies(top?.results || []);
                setTrendingMovies(trend?.results || []);

                if (pop?.results?.length) {
                    setHeroMovie(pop.results[0]);
                }
            } catch (error) {
                console.error("Errore caricamento Home:", error);
            }
        };

        loadAll();
    }, []);

    const handleFavoriteHero = () => {
        if (!heroMovie) return;
        if (favorites.some(f => String(f.id) === String(heroMovie.id))) {
            removeFavorite(heroMovie.id);
        } else {
            addFavorite(heroMovie);
        }
    };

    // --- 3. FUNZIONE CLIC "ALTRE INFO" ---
    const handleHeroInfo = () => {
        if (!heroMovie) return;
        
        
        navigate(`/movie/${heroMovie.id}`, { 
            state: { 
                movie: heroMovie, 
                isTvShow: false 
            } 
        });
    };

    const isHeroFavorite = heroMovie && favorites.some(f => String(f.id) === String(heroMovie.id));
    
    // URL immagine di sfondo (con fallback)
    const backdropUrl = heroMovie?.backdrop_path 
        ? `https://image.tmdb.org/t/p/original${heroMovie.backdrop_path}`
        : "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=1920&q=80";

    return (
        <div className="home-container-main" style={{ backgroundColor: "#141414", minHeight: "100vh" }}>
            
            {/* HERO SECTION */}
            {heroMovie && (
                <div className="hero-container mb-5"
                    style={{ backgroundImage: `url(${backdropUrl})` }}>
                    
                    <div className="hero-gradient">
                        <div className="hero-content">
                            
                            {/* Branding */}
                            <div className="hero-branding mb-3">
                                <img src={logoImage} alt="CineVerse" className="hero-brand-logo" />
                                <span className="hero-brand-text">FILM</span>
                            </div>

                            <h1 className="hero-title">{heroMovie.title}</h1>
                            
                            {/* Metadata */}
                            <div className="hero-metadata mb-3">
                                <span className="match-score">98% Match</span>
                                <span className="year">{heroMovie.release_date?.substring(0,4)}</span>
                                <span className="rating-box">HD</span>
                            </div>

                            <p className="hero-overview">{heroMovie.overview}</p>

                            {/* Bottoni */}
                            <div className="hero-buttons d-flex gap-3 mt-4" style={{ zIndex: 10, position: 'relative' }}>
                                {/* Bottone Preferiti */}
                                <button
                                    className="btn hero-btn-primary d-flex align-items-center gap-2"
                                    onClick={handleFavoriteHero}
                                >
                                    {/* Icona SVG Cuore/Check */}
                                    {isHeroFavorite ? (
                                        <svg width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path d="M12.736 3.97a.733.733 0 0 1 1.047 0c.286.289.29.756.01 1.05L7.88 12.01a.733.733 0 0 1-1.065.02L3.217 8.384a.757.757 0 0 1 0-1.06.733.733 0 0 1 1.047 0l3.052 3.093 5.4-6.425a.247.247 0 0 1 .02-.022Z"/></svg>
                                    ) : (
                                        <svg width="24" height="24" fill="currentColor" viewBox="0 0 16 16"><path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/></svg>
                                    )}
                                    {isHeroFavorite ? "Nella Lista" : "La mia lista"}
                                </button>

                                {/* Bottone Info - ORA CLICCABILE */}
                                <button 
                                    className="btn hero-btn-secondary d-flex align-items-center gap-2"
                                    onClick={handleHeroInfo} // 4. COLLEGATO QUI
                                >
                                    {/* Icona SVG Info */}
                                    <svg width="24" height="24" fill="currentColor" viewBox="0 0 16 16">
                                        <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                        <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                                    </svg>
                                    Altre info
                                </button>
                            </div>

                        </div>
                    </div>
                    <div className="hero-fade-bottom"></div>
                </div>
            )}

            {/* LISTE FILM */}
            <div className="movies-sliders-container container-fluid px-4">
                <FilmSection title="🎬 Popolari su CineVerse" movies={popularMovies} />
                <FilmSection title="⭐ I più votati dalla critica" movies={topRatedMovies} />
                <FilmSection title="🔥 In Tendenza ora" movies={trendingMovies} />
            </div>
        </div>
    );
}

function FilmSection({ title, movies }) {
    const [showAll, setShowAll] = useState(false);
    const toggleShow = () => setShowAll(prev => !prev);
    const displayed = showAll ? movies : movies.slice(0, 6);

    if (!movies || movies.length === 0) return null;

    return (
        <div className="mb-5 movie-section">
            <h3 className="text-white mb-3 fw-bold">{title}</h3>
            
            <div className="row g-3">
                {displayed.map(movie => (
                    <div key={movie.id} className="col-6 col-sm-4 col-md-3 col-lg-2">
                        <MovieCard movie={movie} />
                    </div>
                ))}
            </div>

            {movies.length > 6 && (
                <div className="text-end mt-2">
                    <button className="btn btn-link text-decoration-none text-secondary" onClick={toggleShow} style={{fontSize: '0.8rem'}}>
                        {showAll ? "Vedi meno" : "Vedi tutti >"}
                    </button>
                </div>
            )}
        </div>
    );
}