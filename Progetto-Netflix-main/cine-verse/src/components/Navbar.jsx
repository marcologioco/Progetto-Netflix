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
    const [isSearchOpen, setIsSearchOpen] = useState(false); 
    const [searchQuery, setSearchQuery] = useState(''); 
    
    // STATO PER IL MENU MOBILE (HAMBURGER)
    const [isMenuOpen, setIsMenuOpen] = useState(false); 
    
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
        // Chiude il menu mobile se si apre la ricerca su desktop (non rilevante qui, ma buona prassi)
        if (isMenuOpen && !isSearchOpen) {
            // Se apri la ricerca in modalità mobile, il menu rimane aperto e la lente scompare
            // ma se chiudi la ricerca, non chiudere il menu.
        }
    };

    // Funzione: Toggle del menu mobile
    const handleMenuToggle = () => {
        setIsMenuOpen(!isMenuOpen);
        // Chiude la barra di ricerca quando si apre il menu mobile
        if (isSearchOpen) { 
            setIsSearchOpen(false); 
        }
    };
    
    // Funzione: Gestione dell'invio della ricerca
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/search?query=${searchQuery.trim()}`);
            setIsSearchOpen(false); 
            setSearchQuery('');
        }
    };

    return (
        <nav 
            className={`navbar navbar-expand-lg fixed-top px-4 transition-navbar ${
                isScrolled ? 'navbar-scrolled' : 'navbar-transparent'
            }`}
        >
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
                    onClick={handleMenuToggle} 
                    aria-controls="navbarNav"
                    aria-expanded={isMenuOpen} 
                    aria-label="Toggle navigation"
                >
                    {/* Icona che cambia: X se aperto, Hamburger se chiuso */}
                    {isMenuOpen ? (
                        <X size={24} color="white" /> 
                    ) : (
                        <span className="navbar-toggler-icon" style={{ filter: 'invert(1)' }}></span>
                    )}
                </button>

                {/* Menu a Tendina */}
                <div 
                    className={`collapse navbar-collapse ${isMenuOpen ? 'show' : ''}`}
                    id="navbarNav"
                >
                    {/* Link Principali (Home, Film, Serie TV) */}
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink 
                                to="/" 
                                end 
                                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                                onClick={() => setIsMenuOpen(false)} 
                            >
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink 
                                to="/movies" 
                                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Film
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink 
                                to="/tvshows" 
                                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                                onClick={() => setIsMenuOpen(false)}
                            >
                                Serie TV
                            </NavLink>
                        </li>
                    </ul>

                    {/* Icone a destra - ORA APPAIONO SOTTO I LINK SU MOBILE */}
                    <ul 
                        className="navbar-nav d-flex align-items-center gap-3 mobile-icon-list"
                    >
                        
                        {/* -------------------- RICERCA (LOGICA UNIFICATA) -------------------- */}
                        <li className="nav-item search-container">
                            
                            {/* Visualizzazione condizionale: Se la ricerca è aperta, mostra il form; altrimenti, mostra la lente */}
                            {isSearchOpen ? (
                                <form onSubmit={handleSearchSubmit} 
                                    className={`search-form-absolute ${isMenuOpen ? 'mobile-inline-search' : ''}`}
                                >
                                    <input
                                        type="text"
                                        placeholder="Cerca film o serie TV..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        autoFocus
                                        className="search-input-absolute"
                                    />
                                    {/* Bottone Chiudi (visibile solo su desktop, nascosto dal CSS su mobile) */}
                                    <button type="button" className="close-search-btn" onClick={handleSearchToggle}>
                                        <X size={24} color="white" />
                                    </button>
                                </form>
                            ) : (
                                // Icona Lente fissa
                                <span className="nav-link search-icon" onClick={handleSearchToggle} style={{ cursor: 'pointer' }}>
                                    <Search size={20} color="white" />
                                </span>
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

                        {/* Notifiche (Desktop only) */}
                        <li className="nav-item d-none d-lg-block">
                            <span className="nav-link" style={{cursor: 'pointer'}}>
                                <Bell size={20} color="white" />
                            </span>
                        </li>

                        {/* Profilo (Desktop only) */}
                        <li className="nav-item d-none d-lg-block">
                            <span className="nav-link" style={{cursor: 'pointer'}}>
                                <PersonCircle size={24} color="white" />
                            </span>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}