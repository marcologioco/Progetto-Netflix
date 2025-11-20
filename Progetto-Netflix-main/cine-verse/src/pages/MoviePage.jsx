import React, { useState, useEffect } from 'react';
import { fetchFromTmdb, ENDPOINTS } from '../api/tmdb'; 
import MovieCard from '../components/MovieCard';
import GenreSelector from '../components/GenreSelector'; // Assicurati di aver creato questo componente
import './homeStyle.css'; 

// CONFIGURAZIONE GENERI FILM (Con immagini funzionanti)
const GENRES_UI = [
    { id: 28, name: 'Azione', img: 'https://image.tmdb.org/t/p/w1280/hZkgoQYus5vegHoetLkCJzb17zJ.jpg' },
    { id: 878, name: 'Sci-Fi', img: 'https://image.tmdb.org/t/p/w1280/lzWHmYdfeFiMIY4JaMmtR7GEli3.jpg' },
    { id: 35, name: 'Commedia', img: 'https://image.tmdb.org/t/p/w1280/ctMserH8g2SeOAnCw5gFjdQF8mo.jpg' },
    { id: 27, name: 'Horror', img: 'https://image.tmdb.org/t/p/w1280/53z2fXEKfnNg2uSOPss2unPBGX1.jpg' }, // The Nun II
    { id: 10749, name: 'Romantico', img: 'https://image.tmdb.org/t/p/w1280/6VmFqApQRyZZzmiGOQq2C92jyvH.jpg' }, // Titanic
    { id: 16, name: 'Animazione', img: 'https://image.tmdb.org/t/p/w1280/4HodYYKEIsGOdinkGi2Ucz6X9i0.jpg' },
];

const GENRE_ACTION_ID = 28;
const GENRE_COMEDY_ID = 35;

// Componente Section interno
function Section({ title, movies, showMore, setShowMore }) { 
    const displayed = showMore ? movies : movies.slice(0, 6);
    if (!movies || movies.length === 0) return null;
    return (
        <div className="mb-5 px-3">
            <h2 className="text-white mb-3 fw-bold">{title}</h2>
            <div className="row g-3">
                {displayed.map(movie => (
                    <div key={movie.id} className="col-6 col-sm-4 col-md-3 col-lg-2">
                        <MovieCard movie={movie} /> 
                    </div>
                ))}
            </div>
            <div className="text-center mt-4">
                {movies.length > 6 && (
                    <button className="btn btn-outline-secondary btn-sm px-4" onClick={() => setShowMore(prev => !prev)}>
                        {showMore ? "Mostra meno" : "Vedi altri"}
                    </button>
                )}
            </div>
        </div>
    );
}

export default function MoviePage() {
    // Stati
    const [trendingAction, setTrendingAction] = useState([]);
    const [topRatedComedy, setTopRatedComedy] = useState([]);
    const [cineVerseOriginals, setCineVerseOriginals] = useState([]); 
    const [showMoreAction, setShowMoreAction] = useState(false);
    const [showMoreComedy, setShowMoreComedy] = useState(false);
    const [showMoreOriginals, setShowMoreOriginals] = useState(false);

    const [selectedGenre, setSelectedGenre] = useState(null);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [isLoadingFilter, setIsLoadingFilter] = useState(false);

    useEffect(() => {
        const loadDefaultMovies = async () => {
            const trendAction = await fetchFromTmdb(ENDPOINTS.discoverMovies, { sort_by: 'popularity.desc', with_genres: GENRE_ACTION_ID });
            const topComedy = await fetchFromTmdb(ENDPOINTS.discoverMovies, { sort_by: 'vote_average.desc', 'vote_count.gte': 100, with_genres: GENRE_COMEDY_ID });
            const originals = await fetchFromTmdb(ENDPOINTS.upcomingMovies);
            setTrendingAction(trendAction.results || []);
            setTopRatedComedy(topComedy.results || []);
            setCineVerseOriginals(originals.results || []);
        };
        loadDefaultMovies();
    }, []);

    const handleGenreClick = async (genreId) => {
        if (selectedGenre === genreId) {
            setSelectedGenre(null);
            setFilteredMovies([]);
            return;
        }
        setSelectedGenre(genreId);
        setIsLoadingFilter(true);
        const data = await fetchFromTmdb(ENDPOINTS.discoverMovies, { with_genres: genreId, sort_by: 'popularity.desc' });
        setFilteredMovies(data.results || []);
        setIsLoadingFilter(false);
    };

    return (
        <div className="container-fluid pt-5" style={{ backgroundColor: "#141414", minHeight: "100vh" }}>
            <h1 className="text-white text-center mb-4 pt-4 fw-bold" style={{ fontFamily: 'Oswald, sans-serif', fontSize: '3rem' }}>
                Esplora Generi
            </h1>

            {/* Componente Riutilizzabile */}
            <GenreSelector 
                genres={GENRES_UI} 
                selectedGenre={selectedGenre} 
                onSelect={handleGenreClick} 
            />

            {selectedGenre ? (
                <div className="container-fluid px-3 fade-in-up">
                    <div className="d-flex justify-content-between align-items-center mb-4">
                        <h2 className="text-white m-0">
                            Risultati: <span className="text-danger fw-bold">{GENRES_UI.find(g => g.id === selectedGenre)?.name}</span>
                        </h2>
                        <button className="btn btn-sm btn-outline-light" onClick={() => setSelectedGenre(null)}>✕ Chiudi</button>
                    </div>
                    {isLoadingFilter ? (
                         <div className="text-white text-center py-5"><div className="spinner-border text-danger"></div></div>
                    ) : (
                        <div className="row g-3">
                            {filteredMovies.map(movie => (
                                <div key={movie.id} className="col-6 col-sm-4 col-md-3 col-lg-2"><MovieCard movie={movie} /></div>
                            ))}
                        </div>
                    )}
                </div>
            ) : (
                <div className="fade-in-up">
                    <Section title="✨ Solo su CineVerse" movies={cineVerseOriginals} showMore={showMoreOriginals} setShowMore={setShowMoreOriginals} />
                    <Section title="🔥 In Tendenza: Azione" movies={trendingAction} showMore={showMoreAction} setShowMore={setShowMoreAction} />
                    <Section title="😂 Risate assicurate" movies={topRatedComedy} showMore={showMoreComedy} setShowMore={setShowMoreComedy} />
                </div>
            )}
            <div className="pb-5"></div>
        </div>
    );
}