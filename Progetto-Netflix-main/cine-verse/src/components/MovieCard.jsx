import React from 'react';
import { Card } from 'react-bootstrap';
import './MovieCard.css'; 

export default function MovieCard({ title, poster, genres }) {

    // URL base per i poster di TMDB (ad esempio 'w500' o 'original')
    const POSTER_BASE_URL = 'https://image.tmdb.org/t/p/w500';

    return (
        // Usiamo una Card molto sottile (solo come contenitore)
        <Card className="movie-card-custom">
            <div className="card-content-wrapper">
                {/* Immagine del Poster */}
                <Card.Img 
                    variant='top' 
                    src={`${POSTER_BASE_URL}${poster}`} 
                    alt={title}
                    className="card-poster"
                />
                
                {/* L'overlay gradiente che sfuma l'immagine verso il nero */}
                <div className="image-gradient-overlay"></div>

                {/* Contenuto di testo posizionato in basso sopra l'immagine */}
                <div className="card-text-overlay">
                    <h5 className="movie-title-card">{title}</h5>
                    
                    {/* Visualizzazione dei generi (unendoli con una virgola) */}
                    <p className="movie-genres-card">
                        {genres ? genres.join(', ') : 'Generi non disponibili'}
                    </p>
                </div>
            </div>
        </Card>
    );
}