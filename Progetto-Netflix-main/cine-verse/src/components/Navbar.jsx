import React, { useContext, useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Search, HeartFill, Bell, PersonCircle } from 'react-bootstrap-icons';
import './Navbar.css';
import logoImage from '../assets/logo.png';
import { FavoritesContext } from '../context/FavoritesContext';

export default function NavBar() {
    const { favorites } = useContext(FavoritesContext);
    const [isScrolled, setIsScrolled] = useState(false);

    // Gestione dello scroll per cambiare sfondo navbar
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

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
                        {/* Ricerca */}
                        <li className="nav-item">
                            <NavLink to="/search" className="nav-link search-icon">
                                <Search size={20} color="white" />
                            </NavLink>
                        </li>

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

                        {/* Notifiche (Decorativo) */}
                        <li className="nav-item d-none d-lg-block">
                            <span className="nav-link" style={{cursor: 'pointer'}}>
                                <Bell size={20} color="white" />
                            </span>
                        </li>

                        {/* Profilo (Decorativo) */}
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