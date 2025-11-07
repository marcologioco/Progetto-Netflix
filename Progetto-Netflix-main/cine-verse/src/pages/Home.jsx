// src/pages/Home.jsx

import React, { useState, useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { fetchFromTmdb, ENDPOINTS } from '../api/tmdb'; 
import MovieCard from '../components/MovieCard'; 
import './HomeStyle.css';

// Mappa fittizia dei generi (dovrebbe essere caricata da API in un progetto completo)
const DUMMY_GENRES = {
    28: 'Azione', 12: 'Avventura', 35: 'Commedia', 80: 'Crimine', 18: 'Drammatico', 
    53: 'Thriller', 10749: 'Romance', 14: 'Fantasy', 878: 'Fantascienza', 10752: 'Guerra'
};


export default function Home() {
    const [popularMovies, setPopularMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const loadMovies = async () => {
            try {
                const data = await fetchFromTmdb(ENDPOINTS.popularMovies);
               

                setPopularMovies(data.results || []); 
            } catch (error) {
                console.error("Impossibile caricare i film, verifica la console per l'errore TMDB/rete.", error);
            } finally {
                setLoading(false);
            }
        };

        loadMovies();
    }, []); 

    if (loading) {
        return <Container className="text-white pt-5" style={{ minHeight: '100vh', padding: '100px 0' }}>Caricamento film... 🍿</Container>;
    }

    // Se l'array è vuoto,  messaggio di errore 
    if (popularMovies.length === 0) {
         return (
            <Container className="text-danger pt-5" style={{ minHeight: '100vh', padding: '100px 0' }}>
                <h3 className='text-center'>⚠️ Errore di Caricamento Dati ⚠️</h3>
                <p className='text-center'>I film non sono stati caricati. Controlla la console del browser e verifica che la tua Chiave API TMDB in `src/api/tmdb.js` sia corretta e attiva (errore 401).</p>
            </Container>
        );
    }
    
    return (
        <Container fluid className="pt-5" style={{ backgroundColor: '#141414', minHeight: '100vh' }}>
            <h2 className=" main-title">Film Popolari</h2>
            
            <Row xs={2} sm={3} md={4} lg={6} className="g-4 px-3">
                {popularMovies.map(movie => (
                    <Col key={movie.id} className="d-flex justify-content-center">
                        <MovieCard 
                            title={movie.title} 
                            poster={movie.poster_path} 
                            // Trasformiamo gli ID in nomi
                            genres={movie.genre_ids.map(id => DUMMY_GENRES[id] || 'Sconosciuto')}
                        />
                    </Col>
                ))}
            </Row>
        </Container>
    );
}