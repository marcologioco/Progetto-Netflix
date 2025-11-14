import React, { useContext } from 'react';
import MovieCard from '../components/MovieCard';
import { FavoritesContext } from '../context/FavoritesContext';

export default function Favorites() {
    const { favorites } = useContext(FavoritesContext);

    return (
        <div className="container-fluid pt-4" style={{ backgroundColor: "#141414", minHeight: "100vh" }}>
            <h2 className="text-white mb-3 px-3">❤️ I miei Preferiti</h2>
            
            {favorites.length === 0 ? (
                <p className="text-white px-3">Nessun film aggiunto ai preferiti.</p>
            ) : (
                <div className="row g-3 px-3">
                    {favorites.map(movie => (
                        <div key={movie.id} className="col-6 col-sm-4 col-md-3 col-lg-2">
                            <MovieCard movie={movie} />

                           
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
