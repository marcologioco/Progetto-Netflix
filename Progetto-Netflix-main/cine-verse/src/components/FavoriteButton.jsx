// src/components/FavoriteButton.jsx
import React, { useState } from 'react';
import { HeartFill } from 'react-bootstrap-icons';
import './FavoriteButton.css';

export default function FavoriteButton({ isFavorite, onClick }) {
    const [clicked, setClicked] = useState(false);

    const handleClick = () => {
        setClicked(true);
        onClick && onClick(); // callback per aggiungere/rimuovere dai preferiti
        setTimeout(() => setClicked(false), 300); // reset animazione
    };

    return (
        <button
            className={`favorite-btn ${isFavorite ? 'favorite-active' : ''} ${clicked ? 'favorite-clicked' : ''}`}
            onClick={handleClick}
        >
            <HeartFill size={24} />
        </button>
    );
}
