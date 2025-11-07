// src/components/Navbar.jsx (o come lo hai chiamato)

import React from 'react';
import { Link, NavLink } from 'react-router-dom'; // Importiamo Link/NavLink per il routing
import { Navbar, Container, Nav } from 'react-bootstrap'; 
import { Search, HeartFill } from 'react-bootstrap-icons'; // Useremo questa libreria per le icone

// Assicurati di aver installato react-bootstrap-icons se non l'hai fatto:
// npm install react-bootstrap-icons

export default function NavBar() {
    
    // Contatore fittizio per i preferiti (sarà dinamico in seguito)
    const favoriteCount = 5; 

    return (
        <Navbar bg='dark' data-bs-theme='dark' fixed='top' expand="lg">
            <Container fluid>
                
                {/* 1. Logo/Brand: Link a Home */}
                <Navbar.Brand as={Link} to="/" style={{ color: '#E50914', fontWeight: 'bold' }}>
                    CineeVerse
                </Navbar.Brand>
                
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                
                <Navbar.Collapse id="basic-navbar-nav">
                    
                    {/* 2. Link di Navigazione principali (sinistra) */}
                    <Nav className="me-auto">
                        {/* Usiamo NavLink per avere la classe 'active' automatica */}
                        <Nav.Link as={NavLink} to="/" end>Home</Nav.Link>
                        {/* FILM e SERIE TV possono puntare alla Home per ora, 
                            o ad endpoint specifici in futuro */}
                        <Nav.Link as={NavLink} to="/movies">Film</Nav.Link>
                        <Nav.Link as={NavLink} to="/tvshows">Serie TV</Nav.Link>
                    </Nav>

                    {/* 3. Link di servizio (destra) */}
                    <Nav className="ms-auto d-flex align-items-center">
                        
                        {/* Link Ricerca (icona) */}
                        <Nav.Link as={NavLink} to="/search" className="me-3">
                            <Search size={20} />
                        </Nav.Link>

                        {/* Link Preferiti (icona + contatore) */}
                        <Nav.Link 
                            as={NavLink} 
                            to="/favorites" 
                            className="d-flex align-items-center"
                        >
                            <HeartFill size={20} color="#E50914" />
                            {/* Visualizzazione del conteggio (stile badge) */}
                            <span className="ms-1 badge bg-danger rounded-pill">
                                {favoriteCount}
                            </span>
                        </Nav.Link>
                    </Nav>
                    
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}