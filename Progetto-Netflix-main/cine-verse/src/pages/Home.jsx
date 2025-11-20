import React, { useState, useEffect, useContext } from 'react';
import { fetchFromTmdb, ENDPOINTS } from '../api/tmdb';
import MovieCard from '../components/MovieCard';
import { FavoritesContext } from '../context/FavoritesContext';
import './HomeStyle.css';
import logoImage from '../assets/logo.png';
import { InfoCircle, Check, Plus } from 'react-bootstrap-icons';

export default function Home() {
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

                setPopularMovies(pop.results || []);
                setTopRatedMovies(top.results || []);
                setTrendingMovies(trend.results || []);

                if (pop.results?.length) {
                    setHeroMovie(pop.results[0]);
                }
            } catch (error) {
                console.error("Errore API:", error);
            }
        };

        loadAll();
    }, []);

    const handleFavoriteHero = () => {
        if (!heroMovie) return;
        if (favorites.some(f => f.id === heroMovie.id)) removeFavorite(heroMovie.id);
        else addFavorite(heroMovie);
    };

    const isHeroFavorite = heroMovie && favorites.some(f => f.id === heroMovie.id);

    return (
        <div className="home-container-main" style={{ backgroundColor: "#141414", minHeight: "100vh" }}>
            
            {/* HERO SECTION */}
            {heroMovie && (
                <div className="hero-container mb-5"
                    style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${heroMovie.backdrop_path})` }}>
                    
                    <div className="hero-gradient">
                        <div className="hero-content">
                            
                            {/* Branding */}
                            <div className="hero-branding mb-3">
                                <img src={logoImage} alt="CineVerse" className="hero-brand-logo" />
                                <span className="hero-brand-text">SERIE</span>
                            </div>

                            <h1 className="hero-title">{heroMovie.title}</h1>
                            
                            {/* Metadata */}
                            <div className="hero-metadata mb-3">
                                <span className="match-score">98% Match</span>
                                <span className="year">{heroMovie.release_date?.substring(0,4)}</span>
                                <span className="rating-box">VM14</span>
                            </div>

                            <p className="hero-overview">{heroMovie.overview}</p>

                            {/* Bottoni */}
                            <div className="hero-buttons d-flex gap-3 mt-4">
                                <button
                                    className="btn hero-btn-primary d-flex align-items-center gap-2"
                                    onClick={handleFavoriteHero}
                                >
                                    {isHeroFavorite ? <Check size={24} /> : <Plus size={24} />}
                                    {isHeroFavorite ? "Nella Lista" : "La mia lista"}
                                </button>

                                <button className="btn hero-btn-secondary d-flex align-items-center gap-2">
                                    <InfoCircle size={20} />
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