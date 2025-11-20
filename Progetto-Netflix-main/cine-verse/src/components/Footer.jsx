import React from 'react';
import { Link } from 'react-router-dom'; // Usiamo Link per navigare internamente
import './Footer.css';

export default function Footer() {
    return (
        <footer className="site-footer">
            <div className="footer-container">
                
                {/* 1. Icone Social */}
                <div className="footer-social">
                    <a href="#" aria-label="Facebook" className="social-link">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M22 12.06C22 6.53 17.5 2.05 12 2.05C6.5 2.05 2 6.53 2 12.06C2 17.06 5.66 21.21 10.44 21.96V14.96H7.9V12.06H10.44V9.85C10.44 7.34 11.93 5.96 14.15 5.96C15.21 5.96 16.12 6.04 16.12 6.04V8.51H15.01C13.77 8.51 13.38 9.28 13.38 10.07V12.06H16.16L15.72 14.96H13.38V21.96C18.16 21.21 22 17.06 22 12.06Z"/></svg>
                    </a>
                    <a href="#" aria-label="Instagram" className="social-link">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M7.8 2H16.2C19.4 2 22 4.6 22 7.8V16.2C22 19.4 19.4 22 16.2 22H7.8C4.6 22 2 19.4 2 16.2V7.8C2 4.6 4.6 2 7.8 2ZM7.6 4C5.6 4 4 5.6 4 7.6V16.4C4 18.4 5.6 20 7.6 20H16.4C18.4 20 20 18.4 20 16.4V7.6C20 5.6 18.4 4 16.4 4H7.6Z"/><path d="M12 7C9.2 7 7 9.2 7 12C7 14.8 9.2 17 12 17C14.8 17 17 14.8 17 12C17 9.2 14.8 7 12 7ZM12 15C10.3 15 9 13.7 9 12C9 10.3 10.3 9 12 9C13.7 9 15 10.3 15 12C15 13.7 13.7 15 12 15Z"/><path d="M18 5C17.4 5 17 5.4 17 6C17 6.6 17.4 7 18 7C18.6 7 19 6.6 19 6C19 5.4 18.6 5 18 5Z"/></svg>
                    </a>
                    <a href="#" aria-label="Twitter" className="social-link">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M22.46 6C21.69 6.35 20.86 6.58 20 6.69C20.88 6.16 21.56 5.32 21.88 4.31C21.05 4.81 20.13 5.16 19.16 5.36C18.37 4.5 17.26 4 16.05 4C13.65 4 11.73 5.92 11.73 8.29C11.73 8.63 11.77 8.96 11.84 9.27C8.28 9.09 5.11 7.38 3 4.79C2.63 5.42 2.42 6.16 2.42 6.94C2.42 8.43 3.17 9.75 4.33 10.5C3.62 10.5 2.96 10.3 2.38 10V10.06C2.38 12.13 3.86 13.86 5.84 14.26C5.48 14.36 5.1 14.4 4.7 14.4C4.42 14.4 4.15 14.37 3.89 14.32C4.44 16.03 6.03 17.28 7.92 17.31C6.44 18.47 4.58 19.16 2.56 19.16C2.21 19.16 1.86 19.14 1.53 19.1C3.44 20.33 5.72 21 8.16 21C16.08 21 20.41 14.41 20.41 8.72C20.41 8.53 20.41 8.34 20.4 8.16C21.24 7.56 21.96 6.84 22.54 6H22.46Z"/></svg>
                    </a>
                </div>

                {/* 2. Link Semplificati */}
                <div className="footer-links-simple">
                    <Link to="/" className="footer-link">Home</Link>
                    <Link to="/movies" className="footer-link">Film</Link>
                    <Link to="/tvshows" className="footer-link">Serie TV</Link>
                    <Link to="/favorites" className="footer-link">La mia Lista</Link>
                    <span className="footer-separator">|</span>
                    <a href="#" className="footer-link">Chi Siamo</a>
                    <a href="#" className="footer-link">Privacy</a>
                </div>

                {/* 3. Copyright */}
                <div className="footer-copyright">
                    <p>&copy; 2024 CineVerse. Realizzato per il progetto React.</p>
                </div>
            </div>
        </footer>
    );
}