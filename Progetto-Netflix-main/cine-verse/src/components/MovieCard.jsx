import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom'; 
import { FavoritesContext } from '../context/FavoritesContext.jsx';
import { DUMMY_GENRES } from '../utils/genres.js'; 
import FavoriteButton from './FavoriteButton.jsx';
import './MovieCard.css';

export default function MovieCard({ media, movie }) {
    const navigate = useNavigate();

    // Unifichiamo i dati: usa 'media' se arriva dalla ricerca, altrimenti 'movie'
    const item = media || movie;

    if (!item) return null;

    const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);
    
    const isFavorite = favorites.some(f => String(f.id) === String(item.id));
    const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";

    const getRatingColor = (vote) => {
        if (vote >= 7.7) return '#46d369';
        if (vote >= 6 && vote <= 7.7) return '#ffc107';
        return '#f44336';
    };

    const handleCardClick = () => {
        // Capisce se è TV o Film
        const isTvShow = item.media_type === 'tv' || item.first_air_date || item.name;
        const targetPath = isTvShow ? `/tv/${item.id}` : `/movie/${item.id}`;

        navigate(targetPath, { 
            state: { 
                movie: item, 
                isTvShow: isTvShow 
            } 
        });
    };

    const title = item.title || item.name;
    const date = item.release_date || item.first_air_date;

    // Fallback per immagine mancante
    const imageSrc = item.poster_path 
        ? `${POSTER_BASE_URL}${item.poster_path}` 
        : 'https://via.placeholder.com/500x750?text=No+Poster';

    return (
        <div className="movie-card-modern" onClick={handleCardClick}>
            <div className="poster-wrapper">
                <img
                    src={imageSrc}
                    alt={title}
                    className="card-poster"
                />
                <div className="rating-badge" style={{backgroundColor: getRatingColor(item.vote_average)}}>
                    <span className="rating-text">{item.vote_average?.toFixed(1)}</span>
                </div>
            </div>

            <div className="content-overlay">
                <div className="content-details">
                    <h5 className="movie-title">{title}</h5>
                    
                    <div className="meta-info">
                        <span className="movie-year">{date?.substring(0, 4) || 'N/A'}</span>
                        <span className="separator">•</span>
                        
                        {item.media_type && (
                            <>
                                <span className="media-type" style={{fontSize: '0.6rem', border: '1px solid #666', padding: '0 4px', borderRadius: '4px', color:'#ccc'}}>
                                    {item.media_type === 'tv' ? 'TV' : 'Film'}
                                </span>
                                <span className="separator">•</span>
                            </>
                        )}

                        <span className="movie-genre">
                            {item.genre_ids?.slice(0, 2).map(id => DUMMY_GENRES[id] || 'Genere').filter(Boolean).join(', ') || 'Info'}
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