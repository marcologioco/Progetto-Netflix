// src/pages/Home.jsx

import React, { useState, useEffect } from 'react';
import { fetchFromTmdb, ENDPOINTS } from '../api/tmdb';
import MovieCard from '../components/MovieCard';
import './HomeStyle.css';

const DUMMY_GENRES = {
    28: 'Azione', 12: 'Avventura', 35: 'Commedia', 80: 'Crimine',
    18: 'Drammatico', 53: 'Thriller', 10749: 'Romance', 14: 'Fantasy',
    878: 'Fantascienza', 10752: 'Guerra'
};

export default function Home() {
    const [popularMovies, setPopularMovies] = useState([]);
    const [topRatedMovies, setTopRatedMovies] = useState([]);
    const [trendingMovies, setTrendingMovies] = useState([]);

    const [showMorePop, setShowMorePop] = useState(false);
    const [showMoreTop, setShowMoreTop] = useState(false);
    const [showMoreTrend, setShowMoreTrend] = useState(false);

    useEffect(() => {
        const loadAll = async () => {
            const pop = await fetchFromTmdb(ENDPOINTS.popularMovies);
            const top = await fetchFromTmdb(ENDPOINTS.topRated);
            const trend = await fetchFromTmdb(ENDPOINTS.trending);

            setPopularMovies(pop.results || []);
            setTopRatedMovies(top.results || []);
            setTrendingMovies(trend.results || []);
        };

        loadAll();
    }, []);

    return (
        <div className="container-fluid pt-4" style={{ backgroundColor: "#141414", minHeight: "100vh" }}>

            {/* ===================== POPOLARI ===================== */}
            <Section
                title="🎬 Film Popolari"
                movies={popularMovies}
                showMore={showMorePop}
                setShowMore={setShowMorePop}
            />

            {/* ===================== TOP RATED ===================== */}
            <Section
                title="⭐ Più Votati"
                movies={topRatedMovies}
                showMore={showMoreTop}
                setShowMore={setShowMoreTop}
            />

            {/* ===================== TRENDING ===================== */}
            <Section
                title="🔥 In Tendenza"
                movies={trendingMovies}
                showMore={showMoreTrend}
                setShowMore={setShowMoreTrend}
            />
        </div>
    );
}


/* COMPONENTE SEZIONE PER NON RIPETERE CODICE */
function Section({ title, movies, showMore, setShowMore }) {

    const displayed = showMore ? movies : movies.slice(0, 6);

    return (
        <div className="mb-5 px-3">
            <h2 className="text-white mb-3">{title}</h2>

            <div className="row g-3">
                {displayed.map(movie => (
                    <div key={movie.id} className="col-6 col-sm-4 col-md-3 col-lg-2">
                        <MovieCard
                            title={movie.title}
                            poster={movie.poster_path}
                            vote={movie.vote_average}
                            genres={movie.genre_ids.map(id => DUMMY_GENRES[id] || 'Sconosciuto')}
                            onAddFavorite={() => handleAddFavorite(movie)}
                        />

                    </div>
                ))}
            </div>

            {/* BOTTONE "MOSTRA ALTRI" */}
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
