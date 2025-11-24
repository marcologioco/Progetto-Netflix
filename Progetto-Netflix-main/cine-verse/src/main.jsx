import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import App from './App.jsx';
import Home from './pages/Home.jsx';
import Favorites from './pages/Favorites.jsx';
import SearchResults from './pages/SearchResults.jsx';
import MovieDetail from './pages/MovieDetail.jsx'; // Assicurati che il file esista

import MoviesPage from './pages/MoviePage.jsx';
import TvShowsPage from './pages/SerieTvPage.jsx';

import { FavoritesProvider } from './context/FavoritesContext.jsx';

const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            { index: true, element: <Home /> },
            { path: 'movies', element: <MoviesPage /> },
            { path: 'tvshows', element: <TvShowsPage /> },
            { path: 'favorites', element: <Favorites /> },
            { path: 'search', element: <SearchResults /> },
            
            
            { path: 'movie/:id', element: <MovieDetail /> },
            { path: 'tv/:id', element: <MovieDetail /> }, 
        ]
    }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <FavoritesProvider>
            <RouterProvider router={router} />
        </FavoritesProvider>
    </React.StrictMode>
);