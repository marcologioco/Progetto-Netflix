import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import MovieCard from '../components/MovieCard';
import { FavoritesContext } from '../context/FavoritesContext';

export default function Favorites() {
    const { favorites } = useContext(FavoritesContext);

    return (
        <div className="container-fluid pt-5" style={{ backgroundColor: "#141414", minHeight: "100vh", paddingBottom: "3rem" }}>
            
            {/* Titolo e Contatore */}
            <div className="d-flex align-items-center gap-2 mb-4 px-3">
                <h2 className="text-white fw-bold m-0">La mia Lista</h2>
                {favorites.length > 0 && (
                    <span className="badge bg-danger" style={{fontSize: '1rem'}}>
                        {favorites.length}
                    </span>
                )}
            </div>
            
            {/* Logica Lista Vuota vs Lista Piena */}
            {favorites.length === 0 ? (
                <div className="text-center text-white mt-5">
                    <div className="mb-3" style={{ fontSize: '4rem' }}>
                        💔
                    </div>
                    <h3 className="fw-bold">La tua lista è vuota</h3>
                    <p className="text-white-50">Non hai ancora aggiunto film o serie TV ai preferiti.</p>
                    <Link to="/" className="btn btn-danger mt-3 fw-bold px-4 py-2">
                        Torna alla Home
                    </Link>
                </div>
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