// src/components/Navbar.jsx

import React from 'react';
// Usiamo solo Link e NavLink di react-router-dom
import { Link, NavLink } from 'react-router-dom'; 
import { Search, HeartFill } from 'react-bootstrap-icons'; // Le icone restano utili
import './Navbar.css';



import logoImage from '../assets/logo.png'; 

export default function NavBar() {
    
    const favoriteCount = 5; 

    return (
       
        <nav className='navbar navbar-expand-lg  bg-navbar fixed-top'>
            
            <div className='container-fluid'>
                
                {/* 2. Logo/Brand: Link a Home */}
                {/* 'navbar-brand' è la classe Bootstrap per il logo/brand */}
                <Link to="/" className='navbar-brand d-flex align-items-center'>
                    <img
                        src={logoImage} 
                        height="50" // Puoi aumentare l'altezza qui
                        alt="CineeVerse Logo"
                        className='d-inline-block align-top'
                    />
                </Link>
                
                {/* 3. Toggler per Mobile */}
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
                
                {/* 4. Contenuto della Navbar (Collassabile) */}
                <div className="collapse navbar-collapse" id="navbarNav">
                    
                    {/* Navigazione principale (Sinistra) */}
                    {/* 'navbar-nav' per la lista di link; 'me-auto' per spingerla a sinistra */}
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        
                        {/* Ogni elemento della lista ha la classe 'nav-item' */}
                        <li className="nav-item">
                            {/* Usiamo NavLink. Il contenuto ha la classe 'nav-link' */}
                            <NavLink 
                                to="/" 
                                end
                                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                                aria-current="page"
                            >Home</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink 
                                to="/movies" 
                                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                            >Film</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink 
                                to="/tvshows" 
                                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                            >Serie TV</NavLink>
                        </li>
                    </ul>

                   
                    <ul className="navbar-nav ms-auto d-flex align-items-center">
                        
                        {/* Link Ricerca (icona) */}
                        <li className="nav-item me-3">
                            <NavLink 
                                to="/search" 
                                className="nav-link"
                            >
                                <Search size={20} />
                            </NavLink>
                        </li>

                        {/* Link Preferiti (icona + contatore) */}
                        <li className="nav-item">
                            <NavLink 
                                to="/favorites" 
                                className="nav-link d-flex align-items-center"
                            >
                                <HeartFill size={20} color="#E50914" />
                                {/* Visualizzazione del conteggio (stile badge) */}
                                <span className="ms-1 badge bg-danger rounded-pill">
                                    {favoriteCount}
                                </span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
                
            </div>
        </nav>
    );
}