import React from 'react';  
import ReactDOM from 'react-dom/client'; 
import { RouterProvider, createBrowserRouter } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 

import App from './App.jsx'; 
import Home from './pages/Home.jsx';
import Favorites from './pages/Favorites.jsx';
import SearchResults from './pages/SearchResults.jsx';
import MovieDetail from './pages/MovieDetail.jsx';

import { FavoritesProvider } from './context/FavoritesContext.jsx'; // <-- import context

const router = createBrowserRouter([
    { 
        path: '/', 
        element: <App />, 
        children: [
            { index: true, element: <Home /> },
            { path: 'favorites', element: <Favorites /> },
            { path: 'search', element: <SearchResults /> },
            { path: 'movie/:id', element: <MovieDetail /> },
        ] 
    }
]); 

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <FavoritesProvider>  {/* <-- Wrappiamo tutta l'app */}
            <RouterProvider router={router} />
        </FavoritesProvider>
    </React.StrictMode>
);
