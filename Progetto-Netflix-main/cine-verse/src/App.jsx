// src/App.jsx 

import React from 'react';
import { Outlet } from 'react-router-dom'; 
import NavBar from './components/Navbar.jsx'; 
import Footer from './components/Footer.jsx'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 



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