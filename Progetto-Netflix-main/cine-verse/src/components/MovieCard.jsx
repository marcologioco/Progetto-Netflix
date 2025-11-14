// src/components/MovieCard.jsx

export default function MovieCard({ title, poster, genres, vote }) {

    const POSTER_BASE_URL = "https://image.tmdb.org/t/p/w500";

    return (
        <div className="movie-card-custom">
            <div className="card-content-wrapper">

                {/* Poster */}
                <img
                    src={`${POSTER_BASE_URL}${poster}`}
                    alt={title}
                    className="card-poster"
                />

                {/* Gradiente */}
                <div className="image-gradient-overlay"></div>

                {/* Testo */}
                <div className="card-text-overlay">
                    <h5 className="movie-title-card">{title}</h5>

                    <p className="movie-genres-card">
                        {genres ? genres.join(", ") : "Genere sconosciuto"}
                    </p>

                    {/* ⭐ QUI ENTRA LA VALUTAZIONE ⭐ */}
                    <p className="movie-rating-card">⭐ {vote?.toFixed(1)}</p>
                </div>
            </div>
        </div>
    );
}
