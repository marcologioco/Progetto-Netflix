import React, { createContext, useState, useEffect } from 'react';

export const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem("favorites")) || [];
        setFavorites(stored);
    }, []);

    const addFavorite = (movie) => {
        if (!favorites.some(f => f.id === movie.id)) {
            const updated = [...favorites, movie];
            setFavorites(updated);
            localStorage.setItem("favorites", JSON.stringify(updated));
        }
    };

    const removeFavorite = (movieId) => {
        const updated = favorites.filter(f => f.id !== movieId);
        setFavorites(updated);
        localStorage.setItem("favorites", JSON.stringify(updated));
    };

    return (
        <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite }}>
            {children}
        </FavoritesContext.Provider>
    );
};
