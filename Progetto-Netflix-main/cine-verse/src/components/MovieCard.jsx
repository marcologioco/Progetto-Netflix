import React, { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';
import { DUMMY_GENRES } from '../utils/genres';
import FavoriteButton from './FavoriteButton';
import './MovieCard.css';

export default function MovieCard({ movie }) {
    if (!movie) return null;

    const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);
    const isFavorite = favorites.some(f => f.id === movie.id);
    const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";

    return (
        <div className="movie-card-custom">
            <img
                src={`${POSTER_BASE_URL}${movie.poster_path}`}
                alt={movie.title}
                className="card-poster"
            />

            <div className="image-gradient-overlay"></div>

            {/* Overlay in basso */}
            <div className="card-bottom-overlay">
                <div className="card-left">
                    <h5 className="movie-title-card">{movie.title}</h5>
                    <p className="movie-genres-card">
                        {movie.genre_ids?.map(id => DUMMY_GENRES[id] || 'Sconosciuto').join(', ')}
                    </p>
                </div>

                <div className="card-right">
                    <FavoriteButton
                        isFavorite={isFavorite}
                        onClick={() => isFavorite ? removeFavorite(movie.id) : addFavorite(movie)}
                    />
                    <span className="movie-rating-card">⭐ {movie.vote_average?.toFixed(1)}</span>
                </div>
            </div>
        </div>
    );
}
