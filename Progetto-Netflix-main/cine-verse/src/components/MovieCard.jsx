// src/components/MovieCard.jsx

import React, { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';
import { DUMMY_GENRES } from '../utils/genres'; 
import FavoriteButton from './FavoriteButton';
import SerieTvPage from '../pages/SerieTvPage';
import './MovieCard.css';
import { StarFill } from 'react-bootstrap-icons';

// Questo componente accetta DUE prop: 'media' (dalla ricerca) e 'movie' (dalle pagine Film/Serie TV).
export default function MovieCard({ media, movie }) { 
    
    // DECISIONE CHIAVE: L'oggetto dati è 'media' se esiste, altrimenti è 'movie'.
    const item = media || movie;
    
    if (!item) return null;

    const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);
    const isFavorite = favorites.some(f => f.id === item.id);
    const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";

    // -----------------------------------------------------
    // LOGICA UNIVERSALE DEI CAMPI
    // -----------------------------------------------------
    // isMovie: Se media_type è 'movie' OPPURE se ha release_date (tipico dei film) e non ha media_type (vecchi dati)
    const isMovie = item.media_type === 'movie' || (item.release_date && !item.media_type); 
    const title = item.title || item.name; // Usa 'title' o 'name'
    const releaseDate = item.release_date || item.first_air_date; // Usa release_date o first_air_date
    const voteAverage = item.vote_average;
    // -----------------------------------------------------

    // Colore badge voto in base al punteggio
    const getRatingColor = (vote) => {
        if (vote >= 7.8 ) return '#46d369';
        if (vote >= 6 && vote <=7.7 ) return '#ffc107';
        return '#f44336';
    };
    
    // Non renderizzare se manca il poster
    if (!item.poster_path) return null; 

    return (
        <div className="movie-card-modern">
            {/* Immagine Sfondo */}
            <div className="poster-wrapper">
                <img
                    src={`${POSTER_BASE_URL}${item.poster_path}`} 
                    alt={title}
                    className="card-poster"
                />
                
                {/* Badge Voto */}
                <div className="rating-badge" style={{backgroundColor: getRatingColor(voteAverage)}}>
                    <span className="rating-text">{voteAverage?.toFixed(1)}</span>
                </div>
            </div>

            {/* Overlay Scuro */}
            <div className="content-overlay">
                <div className="content-details">
                    <h5 className="movie-title">{title}</h5>
                    
                    <div className="meta-info">
                        <span className="movie-year">{releaseDate?.substring(0, 4) || 'N/A'}</span>
                        <span className="separator">•</span>
                        
                        {/* Mostra il tipo solo se media_type è presente */}
                        <span className="media-type">
                            {item.media_type ? (isMovie ? 'Film' : 'Serie TV') : ''}
                        </span>
                        {item.media_type && <span className="separator">•</span>}

                        <span className="movie-genre">
                            {item.genre_ids?.slice(0, 2).map(id => DUMMY_GENRES[id]).filter(Boolean).join(', ') || 'N/A'}
                        </span>
                    </div>

                    <div className="action-row">
                        <FavoriteButton
                            isFavorite={isFavorite}
                            onClick={(e) => {
                                e.stopPropagation(); 
                                isFavorite ? removeFavorite(item.id) : addFavorite(item);
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}