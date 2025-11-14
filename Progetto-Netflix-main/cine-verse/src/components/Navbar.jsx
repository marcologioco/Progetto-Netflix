import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Search, HeartFill } from 'react-bootstrap-icons';
import './Navbar.css';
import logoImage from '../assets/logo.png';
import { FavoritesContext } from '../context/FavoritesContext';

export default function NavBar() {
    const { favorites } = useContext(FavoritesContext);

    return (
        <nav className='navbar navbar-expand-lg fixed-top bg-navbar px-4'>
            <div className='container-fluid'>
                {/* Logo */}
                <Link to="/" className='navbar-brand d-flex align-items-center'>
                    <img
                        src={logoImage}
                        height="60" // logo più grande
                        alt="CineeVerse Logo"
                        className='d-inline-block align-top'
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
                    <span className="navbar-toggler-icon"></span>
                </button>

                {/* Menu */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <NavLink
                                to="/"
                                end
                                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                            >
                                Home
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/movies"
                                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                            >
                                Film
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/tvshows"
                                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                            >
                                Serie TV
                            </NavLink>
                        </li>
                    </ul>

                    {/* Icone a destra */}
                    <ul className="navbar-nav ms-auto d-flex align-items-center">
                        {/* Ricerca */}
                        <li className="nav-item me-3">
                            <NavLink to="/search" className="nav-link search-icon">
                                <Search size={22} color="white" />
                            </NavLink>
                        </li>

                        {/* Preferiti */}
                        <li className="nav-item">
                            <NavLink to="/favorites" className="nav-link d-flex align-items-center">
                                <HeartFill size={22} color="#E50914" />
                                <span className="ms-1 badge bg-danger rounded-pill">
                                    {favorites.length}
                                </span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
}
