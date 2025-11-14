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

            // Hero: prendiamo il primo film popolare
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
                            {/* Logo con cerchio + scritta accanto */}
                            <div className="hero-logo-row">
                                <div className="hero-logo-wrapper">
                                    <img
                                        src={logoImage}
                                        alt="CineeVerse Logo"
                                        className="hero-logo"
                                    />
                                </div>
                                <span className="hero-logo-text">CineVerse</span>
                            </div>

                            {/* Titolo e testo */}
                            <h1 className="hero-title">{heroMovie.title}</h1>
                            <p className="hero-overview">{heroMovie.overview}</p>

                            {/* Bottone e stelline */}
                            <div className="hero-btn-rating">
                                <FavoriteButton
                                    isFavorite={favorites.some(f => f.id === heroMovie.id)}
                                    onClick={handleFavoriteHero}
                                />
                                <p className="hero-rating">⭐ {heroMovie.vote_average?.toFixed(1)}</p>
                            </div>

                        </div>
                    </div>
                </div>



            )}

            {/* ===================== POPOLARI ===================== */}
            <Section
                title="🎬 Film Popolari"
                movies={popularMovies}
            />

            {/* ===================== TOP RATED ===================== */}
            <Section
                title="⭐ Più Votati"
                movies={topRatedMovies}
            />

            {/* ===================== TRENDING ===================== */}
            <Section
                title="🔥 In Tendenza"
                movies={trendingMovies}
            />
        </div>
    );
}

function Section({ title, movies }) {
    const displayed = movies.slice(0, 6);

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
        </div>
    );
}
