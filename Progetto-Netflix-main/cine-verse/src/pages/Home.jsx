import React from 'react';
import MovieCard from '../components/MovieCard.jsx';
export default function Home() {
    return (
        <div style={{ marginTop: '5rem', padding: '2rem' }}>
            <h2>Popular Movies</h2>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <MovieCard title='Example Movie' poster='https://via.placeholder.com/200x300' overview='lorem ipsum' /></div>
        </div>

    )
}