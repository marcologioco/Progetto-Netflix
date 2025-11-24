import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { FavoritesContext } from '../context/FavoritesContext.jsx';
import { DUMMY_GENRES } from '../utils/genres.js'; 
import FavoriteButton from './FavoriteButton.jsx';
import './MovieCard.css';

export default function MovieCard({ movie }) {
    const navigate = useNavigate();

    if (!movie) return null;

    const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);
    
    // Confronto sicuro convertendo in stringa
    const isFavorite = favorites.some(f => String(f.id) === String(movie.id));
    const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";

    // Colore badge voto
    const getRatingColor = (vote) => {
        if (vote > 7.7) return '#46d369';
        if (vote >= 6 && vote <= 7.7) return '#ffc107';
        return '#f44336';
    };

    // --- LOGICA INTELLIGENTE PER IL CLICK ---
    const handleCardClick = () => {
        // Capisce se è una serie guardando se ha proprietà tipiche delle serie
        // (first_air_date o name invece di release_date o title)
        const isTvShow = movie.first_air_date || movie.name || movie.media_type === 'tv';
        
        const targetPath = isTvShow ? `/tv/${movie.id}` : `/movie/${movie.id}`;

        // Passiamo i dati nello state per visualizzazione immediata
        navigate(targetPath, { 
            state: { 
                movie: movie,
                isTvShow: isTvShow 
            } 
        });
    };

    // Normalizza i dati per la visualizzazione (Titolo vs Nome)
    const title = movie.title || movie.name;
    const date = movie.release_date || movie.first_air_date;

    return (
        <div className="movie-card-modern" onClick={handleCardClick}>
            <div className="poster-wrapper">
                <img
                    src={movie.poster_path ? `${POSTER_BASE_URL}${movie.poster_path}` : 'https://via.placeholder.com/500x750?text=No+Poster'}
                    alt={title}
                    className="card-poster"
                />
                
                <div className="rating-badge" style={{backgroundColor: getRatingColor(movie.vote_average)}}>
                    <span className="rating-text">{movie.vote_average?.toFixed(1)}</span>
                </div>
            </div>

            <div className="content-overlay">
                <div className="content-details">
                    <h5 className="movie-title">{title}</h5>
                    
                    <div className="meta-info">
                        <span className="movie-year">{date?.substring(0, 4) || 'N/A'}</span>
                        <span className="separator">•</span>
                        <span className="movie-genre">
                            {movie.genre_ids?.slice(0, 2).map(id => DUMMY_GENRES[id] || 'Genere').filter(Boolean).join(', ') || 'Info'}
                        </span>
                    </div>

                    <div className="action-row">
                        <FavoriteButton
                            isFavorite={isFavorite}
                            onClick={(e) => {
                                e.stopPropagation(); // Evita che il click sul cuore apra la pagina dettaglio
                                isFavorite ? removeFavorite(movie.id) : addFavorite(movie);
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}