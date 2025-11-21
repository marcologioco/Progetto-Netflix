// src/pages/SearchResults.jsx

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchContent } from '../api/tmdb'; // Assicurati del percorso corretto
import MovieCard from '../components/MovieCard'; // Assumi di avere un componente MovieCard
import './SearchResults.css'; // Assicurati di creare questo file

export default function SearchResults() {
    // Ottiene il valore di 'query' dalla URL (?query=...)
    const [searchParams] = useSearchParams();
    const query = searchParams.get('query'); 
    const searchTerm = query ? decodeURIComponent(query) : '';

    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Effetto per eseguire la ricerca
    useEffect(() => {
        const fetchResults = async () => {
            if (!searchTerm) {
                setResults([]);
                setLoading(false);
                return;
            }

            setLoading(true);
            setError(null);
            
            try {
                const data = await searchContent(searchTerm);
                setResults(data);
            } catch (err) {
                setError("Impossibile caricare i risultati. Riprova più tardi.");
                setResults([]);
            } finally {
                setLoading(false);
            }
        };

        fetchResults();
    }, [searchTerm]); // Si attiva quando la query nella URL cambia

    return (
        <div className="search-results-page">
            
            <h1 className="search-title">
                {searchTerm ? `Risultati per: "${searchTerm}"` : 'Inizia la ricerca dalla Navbar...'}
            </h1>
            
            <div className="search-content">
                {loading && <p className="loading-message">Caricamento risultati...</p>}

                {error && <p className="error-message">{error}</p>}

                {!loading && !error && results.length === 0 && searchTerm && (
                    <p className="no-results-message">
                        Nessun risultato trovato per "{searchTerm}".
                    </p>
                )}

                <div className="results-grid">
                    {/* Visualizza i risultati */}
                    {!loading && !error && results.length > 0 && results.map(item => (
                        <MovieCard 
                            key={item.id} 
                            media={item} 
                            mediaType={item.media_type}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}