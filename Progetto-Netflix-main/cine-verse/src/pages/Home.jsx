import React, { useState, useEffect, useContext } from 'react';
import { fetchFromTmdb, ENDPOINTS } from '../api/tmdb';
import MovieCard from '../components/MovieCard';
import { FavoritesContext } from '../context/FavoritesContext';
import './HomeStyle.css';
import logoImage from '../assets/logo.png';

const DUMMY_GENRES = {
    28: 'Azione', 12: 'Avventura', 35: 'Commedia', 80: 'Crimine',
    18: 'Drammatico', 53: 'Thriller', 10749: 'Romance', 14: 'Fantasy',
    878: 'Fantascienza', 10752: 'Guerra'
};

export default function Home() {
    const [popularMovies, setPopularMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [trendingMovies, setTrendingMovies] = useState([]);
    const [heroMovie, setHeroMovie] = useState(null);

    const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);

    useEffect(() => {
        const loadAll = async () => {
            const pop = await fetchFromTmdb(ENDPOINTS.popularMovies);
            const top = await fetchFromTmdb(ENDPOINTS.topRated);
            const trend = await fetchFromTmdb(ENDPOINTS.trending);

            setPopularMovies(pop.results || []);
            setTopRatedMovies(top.results || []);
            setTrendingMovies(trend.results || []);

            if (pop.results?.length) setHeroMovie(pop.results[0]);
        };

        loadAll();
    }, []);

    const handleFavoriteHero = () => {
        if (!heroMovie) return;
        if (favorites.some(f => f.id === heroMovie.id)) removeFavorite(heroMovie.id);
        else addFavorite(heroMovie);
    };

    return (
        <div className="container-fluid pt-4" style={{ backgroundColor: "#141414", minHeight: "100vh" }}>
            
            {/* HERO */}
            {heroMovie && (
                <div className="hero-container mb-5"
                    style={{ backgroundImage: `url(https://image.tmdb.org/t/p/original${heroMovie.backdrop_path})` }}>
                    
                    <div className="hero-gradient">
                        <div className="hero-content">
                            
                            {/* Logo */}
                            <div className="hero-logo-row">
                                <div className="hero-logo-wrapper">
                                    <img src={logoImage} alt="CineVerse Logo" className="hero-logo" />
                                </div>
                                <span className="hero-logo-text">CineVerse</span>
                            </div>

                            <h1 className="hero-title">{heroMovie.title}</h1>
                            <p className="hero-overview">{heroMovie.overview}</p>

                            {/* Preferiti + Rating */}
                            <div className="hero-btn-rating">
                                <button
                                    className="btn hero-favorite-btn"
                                    onClick={handleFavoriteHero}
                                >
                                    {favorites.some(f => f.id === heroMovie.id)
                                        ? "Rimuovi dai preferiti"
                                        : "Preferiti +"}
                                </button>

                                <span className="hero-rating">
                                    ⭐ {heroMovie.vote_average?.toFixed(1)}
                                </span>
                            </div>

                        </div>
                    </div>
                </div>
            )}

            {/* SEZIONI FILM */}
            <FilmSection title="🎬 Film Popolari" movies={popularMovies} />
            <FilmSection title="⭐ Più Votati" movies={topRatedMovies} />
            <FilmSection title="🔥 In Tendenza" movies={trendingMovies} />
        </div>
    );
}

/* ===========================
   COMPONENTE SEZIONE UNIFICATO
=========================== */
function FilmSection({ title, movies }) {
    const [showAll, setShowAll] = useState(false);

    const toggleShow = () => setShowAll(prev => !prev);

    const displayed = showAll ? movies : movies.slice(0, 6);

    return (
        <div className="mb-5 px-3">
            <h2 className="text-white mb-3">{title}</h2>
            
            <div className="row g-3">
                {displayed.map(movie => (
                    <div key={movie.id} className="col-6 col-sm-4 col-md-3 col-lg-2">
                        <MovieCard movie={movie} />
                    </div>
                ))}
            </div>

            {movies.length > 6 && (
                <div className="text-center mt-3">
                    <button className="btn btn-outline-light" onClick={toggleShow}>
                        {showAll ? "Mostra meno" : "Mostra altri"}
                    </button>
                </div>
            )}
        </div>
    );
}
