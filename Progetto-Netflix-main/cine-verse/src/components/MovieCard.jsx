import React, { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';
import { DUMMY_GENRES } from '../utils/genres'; // Assicurati che questo path sia corretto
import FavoriteButton from './FavoriteButton';
import './MovieCard.css';
import { StarFill } from 'react-bootstrap-icons';

export default function MovieCard({ movie }) {
    if (!movie) return null;

    const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);
    const isFavorite = favorites.some(f => f.id === movie.id);
    const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";

    // Colore badge voto in base al punteggio
    const getRatingColor = (vote) => {
        if (vote >= 8) return '#46d369'; // Verde
        if (vote >= 6) return '#ffc107'; // Giallo
        return '#f44336'; // Rosso
    };

    return (
        <div className="movie-card-modern">
            {/* Immagine Sfondo */}
            <div className="poster-wrapper">
                <img
                    src={movie.poster_path ? `${POSTER_BASE_URL}${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Poster'}
                    alt={movie.title}
                    className="card-poster"
                />
                
                {/* Badge Voto in alto a destra */}
                <div className="rating-badge" style={{backgroundColor: getRatingColor(movie.vote_average)}}>
                    <span className="rating-text">{movie.vote_average?.toFixed(1)}</span>
                </div>
            </div>

            {/* Overlay Scuro che appare sempre un po', ma si intensifica all'hover */}
            <div className="content-overlay">
                <div className="content-details">
                    <h5 className="movie-title">{movie.title}</h5>
                    
                    <div className="meta-info">
                        <span className="movie-year">{movie.release_date?.substring(0, 4) || 'N/A'}</span>
                        <span className="separator">•</span>
                        <span className="movie-genre">
                            {movie.genre_ids?.slice(0, 2).map(id => DUMMY_GENRES[id]).filter(Boolean).join(', ') || 'Film'}
                        </span>
                    </div>

                    <div className="action-row">
                        <FavoriteButton
                            isFavorite={isFavorite}
                            onClick={(e) => {
                                e.stopPropagation(); // Evita click sulla card se aggiungi navigazione
                                isFavorite ? removeFavorite(movie.id) : addFavorite(movie);
                            }}
                        />
                        {/* Qui potresti aggiungere un bottone Play in futuro */}
                    </div>
                </div>
            </div>
        </div>
    );
}