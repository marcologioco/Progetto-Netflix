// src/components/Navbar.jsx

import React, { useContext, useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, HeartFill, Bell, PersonCircle, X } from 'react-bootstrap-icons';
import './Navbar.css';
import logoImage from '../assets/logo.png';
import { FavoritesContext } from '../context/FavoritesContext';

export default function NavBar() {
    const { favorites } = useContext(FavoritesContext);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false); // Stato per aprire/chiudere la barra
    const [searchQuery, setSearchQuery] = useState(''); // Stato per l'input di ricerca
    const navigate = useNavigate(); 

    // Gestione dello scroll per cambiare sfondo navbar
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Funzione: Toggle della barra di ricerca
    const handleSearchToggle = () => {
        if (isSearchOpen) {
            setSearchQuery(''); 
        }
        setIsSearchOpen(!isSearchOpen);
    };

    // Funzione: Gestione dell'invio della ricerca
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            // Naviga alla pagina /search passando il termine come parametro URL
            navigate(`/search?query=${searchQuery.trim()}`);
            setIsSearchOpen(false); // Chiudi la barra dopo l'invio
            setSearchQuery('');
        }
    };

    return (
        <nav className={`navbar navbar-expand-lg fixed-top px-4 transition-navbar ${isScrolled ? 'navbar-scrolled' : 'navbar-transparent'}`}>
            <div className='container-fluid'>
                {/* Logo */}
                <Link to="/" className='navbar-brand d-flex align-items-center'>
                    <img
                        src={logoImage}
                        alt="CineVerse Logo"
                        className='navbar-logo'
                    />
                </Link>

                {/* Toggler Mobile */}
                <button
                    className="navbar-toggler"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon" style={{ filter: 'invert(1)' }}></span>
                </button>

                {/* Menu */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/movies" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Film</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink to="/tvshows" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Serie TV</NavLink>
                        </li>
                    </ul>

                    {/* Icone a destra */}
                    <ul className="navbar-nav ms-auto d-flex align-items-center gap-3">
                        
                        {/* -------------------- RICERCA MODIFICATA -------------------- */}
                        <li className="nav-item search-container">
                            {/* Icona Lente fissa */}
                            <span className="nav-link search-icon" onClick={handleSearchToggle} style={{ cursor: 'pointer' }}>
                                <Search size={20} color="white" />
                            </span>
                            
                            {/* Barra di Ricerca Assoluta (condizionale) */}
                            {isSearchOpen && (
                                <form onSubmit={handleSearchSubmit} className="search-form-absolute">
                                    <input
                                        type="text"
                                        placeholder="Cerca film o serie TV..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        autoFocus
                                        className="search-input-absolute"
                                    />
                                    {/* Bottone Chiudi */}
                                    <button type="button" className="close-search-btn" onClick={handleSearchToggle}>
                                        <X size={24} color="white" />
                                    </button>
                                </form>
                            )}
                        </li>
                        {/* ----------------------------------------------------------- */}

                        {/* Preferiti */}
                        <li className="nav-item">
                            <NavLink to="/favorites" className="nav-link position-relative">
                                <HeartFill size={20} color={favorites.length > 0 ? "#E50914" : "white"} />
                                {favorites.length > 0 && (
                                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{fontSize: '0.6rem'}}>
                                        {favorites.length}
                                    </span>
                                )}
                            </NavLink>
                        </li>

                       
                    </ul>
                </div>
            </div>
        </nav>
    );
}