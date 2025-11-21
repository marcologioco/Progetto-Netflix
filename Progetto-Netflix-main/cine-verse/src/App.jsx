// src/App.jsx (VERSIONE CORRETTA)

import React from 'react';
// Importa SOLO Outlet per gestire il layout genitore
import { Outlet } from 'react-router-dom'; 
import NavBar from './components/Navbar.jsx'; 
import Footer from './components/Footer.jsx'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 

// NON hai più bisogno di importare Home, SearchResults, ecc. qui
// dato che vengono importati solo in main.jsx

export default function App() {
    return (
        <>
            <NavBar /> 
            
            <main style={{ minHeight: '100vh', backgroundColor: '#141414' }}>
                {/* TUTTE LE ROTTE FIGLIE VENGONO RENDERIZZATE QUI DENTRO */}
                <Outlet /> 
            </main>
            
            <Footer />
        </>
    );
}