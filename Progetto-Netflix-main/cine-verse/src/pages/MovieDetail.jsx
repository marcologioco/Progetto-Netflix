import React, { useEffect, useState, useContext } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { fetchFromTmdb } from '../api/tmdb';
import MovieCard from '../components/MovieCard';
import FavoriteButton from '../components/FavoriteButton';
import { FavoritesContext } from '../context/FavoritesContext';
import { DUMMY_GENRES } from '../utils/genres';
import './movieDetail.css';

export default function MovieDetail() {
    const { id } = useParams();
    const location = useLocation();
    
    // --- 1. DATI INIZIALI (Dalla Card) ---
    const initialData = location.state?.movie;
    const initialIsTv = location.state?.isTvShow;

    // --- 2. TIPO INIZIALE ---
    let startType = 'movie';
    if (initialIsTv !== undefined) {
        startType = initialIsTv ? 'tv' : 'movie';
    } else if (location.pathname.includes('/tv/')) {
        startType = 'tv';
    }

    // --- STATI ---
    const [movie, setMovie] = useState(initialData || null);
    const [cast, setCast] = useState([]);
    const [trailer, setTrailer] = useState(null);
    const [similar, setSimilar] = useState([]);
    const [contentType, setContentType] = useState(startType);
    
    // Loading è true SOLO se non abbiamo dati parziali
    const [loading, setLoading] = useState(!initialData);
    const [error, setError] = useState(false);

    const { favorites, addFavorite, removeFavorite } = useContext(FavoritesContext);

    const NO_POSTER_IMG = "https://placehold.co/500x750/333/FFF?text=No+Poster";
    const BG_IMAGE = "https://images.unsplash.com/photo-1574267432553-4b4628081c31?auto=format&fit=crop&w=1920&q=80";

    useEffect(() => {
        // Reset stato se cambia film
        if (location.state?.movie && String(location.state.movie.id) === id) {
            setMovie(location.state.movie);
            setLoading(false);
        } else if (!movie || String(movie.id) !== id) {
            setMovie(null);
            setLoading(true);
        }
        
        setError(false);
        window.scrollTo(0, 0);

        const loadFullDetails = async () => {
            let currentType = startType;
            let details = null;

            // --- TENTATIVO 1 (Try Main Type) ---
            try {
                // Rimuovo lo slash iniziale per evitare doppi slash //
                details = await fetchFromTmdb(`${currentType}/${id}`);
                
                if (!details || details.success === false) throw new Error("Fallito tentativo 1");

            } catch (err1) {
                console.warn(`Tentativo 1 (${currentType}) fallito. Provo fallback...`);
                
                // --- TENTATIVO 2 (Fallback Type) ---
                try {
                    currentType = currentType === 'movie' ? 'tv' : 'movie'; // Inverti
                    details = await fetchFromTmdb(`${currentType}/${id}`);
                    
                    if (!details || details.success === false) throw new Error("Fallito tentativo 2");

                } catch (err2) {
                    console.error("Impossibile trovare il contenuto in nessun database.");
                    // Se abbiamo i dati parziali, NON mostriamo errore, teniamo quelli!
                    if (!initialData) setError(true);
                    setLoading(false);
                    return; 
                }
            }

            // --- SUCCESSO ---
            setMovie(details);
            setContentType(currentType); // Conferma se è film o tv
            setLoading(false);

            // Fetch Extra (Cast, Trailer, Simili) usando il tipo CORRETTO
            try {
                const [creditsData, videosData, similarData] = await Promise.all([
                    fetchFromTmdb(`${currentType}/${id}/credits`),
                    fetchFromTmdb(`${currentType}/${id}/videos`),
                    fetchFromTmdb(`${currentType}/${id}/similar`)
                ]);

                setCast(creditsData.cast?.slice(0, 9) || []);
                
                const officialTrailer = videosData.results?.find(
                    vid => vid.site === "YouTube" && (vid.type === "Trailer" || vid.type === "Teaser")
                );
                setTrailer(officialTrailer);
                
                setSimilar(similarData.results?.slice(0, 6) || []);

            } catch (extraErr) {
                console.warn("Errore caricamento extra:", extraErr);
            }
        };

        loadFullDetails();
    }, [id]); 

    // --- RENDER ---

    if (loading && !movie) return <div className="detail-loading">Caricamento...</div>;
    
    if (error && !movie) return (
        <div className="detail-loading flex-column text-center">
            <h2 className="mb-3 text-danger">Contenuto non trovato</h2>
            <Link to="/" className="btn btn-outline-light">Torna alla Home</Link>
        </div>
    );

    // Normalizzazione Dati
    const isFavorite = favorites.some(f => String(f.id) === String(movie?.id));
    const title = movie?.title || movie?.name;
    const originalTitle = movie?.original_title || movie?.original_name;
    const releaseDate = movie?.release_date || movie?.first_air_date;
    const duration = movie?.runtime || (movie?.episode_run_time?.length > 0 ? movie.episode_run_time[0] : null);
    const posterSrc = movie?.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : NO_POSTER_IMG;

    // Render Generi
    const renderGenres = () => {
        if (movie?.genres) {
            return movie.genres.map(g => <span key={g.id} className="genre-tag">{g.name}</span>);
        } else if (movie?.genre_ids) {
            return movie.genre_ids.map(id => <span key={id} className="genre-tag">{DUMMY_GENRES[id] || 'Genere'}</span>);
        }
        return null;
    };

    return (
        <div className="detail-page-wrapper" style={{ backgroundImage: `url(${BG_IMAGE})` }}>
            <div className="detail-page-overlay"></div>

            <div className="container detail-container py-5">
                <div className="detail-window">
                    <div className="row g-0">
                        {/* Poster */}
                        <div className="col-md-4 position-relative">
                            <img 
                                src={posterSrc} 
                                alt={title} 
                                className="detail-poster-img"
                                onError={(e) => { e.target.src = NO_POSTER_IMG; }}
                            />
                        </div>

                        {/* Info */}
                        <div className="col-md-8 p-4 p-md-5 d-flex flex-column justify-content-center">
                            <h1 className="detail-title">{title}</h1>
                            {originalTitle && originalTitle !== title && <h5 className="text-muted mb-3">{originalTitle}</h5>}

                            <div className="d-flex flex-wrap align-items-center gap-3 mb-4 detail-meta">
                                {releaseDate && <span className="meta-year">{releaseDate.substring(0, 4)}</span>}
                                {movie?.vote_average && <span className="meta-rating">⭐ {movie.vote_average.toFixed(1)}</span>}
                                {duration && <span>{duration} min</span>}
                                {movie?.number_of_seasons && <span>{movie.number_of_seasons} Stagioni</span>}
                                <span className="badge bg-secondary text-uppercase">{contentType === 'tv' ? 'Serie TV' : 'Film'}</span>
                            </div>

                            <div className="mb-4">
                                {renderGenres()}
                            </div>

                            <h4 className="section-heading">Sinossi</h4>
                            <p className="detail-overview">
                                {movie?.overview || "Nessuna trama disponibile."}
                            </p>

                            <div className="action-buttons mt-4">
                                <div className="d-flex flex-column align-items-center me-4">
                                    <FavoriteButton 
                                        isFavorite={isFavorite} 
                                        onClick={() => isFavorite ? removeFavorite(movie.id) : addFavorite(movie)}
                                    />
                                    <span className="btn-label">Lista</span>
                                </div>

                            
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sezione Extra */}
                {!loading && (
                    <div className="secondary-content mt-5 fade-in-up">
                        {cast.length > 0 && (
                            <div className="mb-5">
                                <h3 className="text-white mb-4 border-start border-4 border-danger ps-3">Cast Principale</h3>
                                <div className="cast-scroller">
                                    {cast.map(actor => (
                                        <div key={actor.id} className="cast-card">
                                            <img 
                                                src={actor.profile_path ? `https://image.tmdb.org/t/p/w185${actor.profile_path}` : 'https://via.placeholder.com/150'} 
                                                alt={actor.name} 
                                            />
                                            <p className="cast-name">{actor.name}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {trailer && (
                            <div id="trailer-section" className="mb-5">
                                <h3 className="text-white mb-4 border-start border-4 border-danger ps-3">Trailer</h3>
                                <div className="ratio ratio-16x9 trailer-wrapper">
                                    <iframe 
                                        src={`https://www.youtube.com/embed/${trailer.key}`} 
                                        title="Trailer" 
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>
                        )}

                        {similar.length > 0 && (
                            <div>
                                <h3 className="text-white mb-4 border-start border-4 border-danger ps-3">Potrebbe piacerti anche</h3>
                                <div className="row g-3">
                                    {similar.map(sim => (
                                        <div key={sim.id} className="col-6 col-sm-4 col-md-3 col-lg-2">
                                            <MovieCard movie={sim} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}