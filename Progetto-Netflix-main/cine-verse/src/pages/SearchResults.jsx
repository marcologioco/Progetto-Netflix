import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { fetchFromTmdb } from '../api/tmdb.js'; 
import MovieCard from '../components/MovieCard.jsx';
import './homeStyle.css'; 

export default function SearchResults() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query') || searchParams.get('q'); 
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (query) {
            const search = async () => {
                setLoading(true);
                try {
                    // Usa l'endpoint di ricerca multi (film + serie)
                    const data = await fetchFromTmdb('/search/multi', { query: query });
                    
                    // Filtra: teniamo solo film e serie (rimuoviamo persone)
                    const filtered = data?.results?.filter(
                        item => item.media_type === 'movie' || item.media_type === 'tv'
                    ) || [];
                    
                    setResults(filtered);
                } catch (error) {
                    console.error("Errore ricerca:", error);
                } finally {
                    setLoading(false);
                }
            };
            search();
        } else {
            setResults([]);
        }
    }, [query]);

    return (
        <div className="container-fluid pt-5" style={{ backgroundColor: "#141414", minHeight: "100vh" }}>
            <div className="px-3 pt-4">
                <h2 className="text-white mb-4">
                    Risultati per: <span className="text-danger fw-bold">"{query}"</span>
                </h2>

                {loading ? (
                    <div className="text-center text-white py-5">
                        <div className="spinner-border text-danger" role="status"></div>
                    </div>
                ) : results.length > 0 ? (
                    <div className="row g-3">
                        {results.map(item => (
                            <div key={item.id} className="col-6 col-sm-4 col-md-3 col-lg-2">
                                {/* Passiamo 'media' così la card sa che tipo è */}
                                <MovieCard media={item} />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-white mt-5">
                        <h3>Nessun risultato trovato 😢</h3>
                        <p className="text-white-50">Prova a cercare qualcos'altro.</p>
                    </div>
                )}
            </div>
        </div>
    );
}