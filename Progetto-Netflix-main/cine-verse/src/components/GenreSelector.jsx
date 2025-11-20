import React from 'react';
// Assicurati che questo file CSS esista
import './GenreSelector.css'; 

export default function GenreSelector({ genres, selectedGenre, onSelect }) {
    return (
        <div className="container px-3 mb-5">
            <div className="row g-3 justify-content-center">
                {genres.map(genre => (
                    <div key={genre.id} className="col-6 col-sm-4 col-md-2">
                        <div 
                            className={`genre-card ${selectedGenre === genre.id ? 'active' : ''}`} 
                            onClick={() => onSelect(genre.id)}
                        >
                            <div 
                                className="genre-bg-image" 
                                style={{ backgroundImage: `url(${genre.img})` }}
                            ></div>
                            <div className="genre-overlay"></div>
                            <span className="genre-name">{genre.name}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}