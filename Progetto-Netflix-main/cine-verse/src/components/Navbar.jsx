import React from 'react';
import { Navbar, Container } from 'react-bootstrap';
export default function NavBar() {
    return (
        <Navbar bg='dark' data-bs-theme='dark' fixed='top'>
            <Container>
                <Navbar.Brand>CineeVerse</Navbar.Brand>
            </Container>
        </Navbar>)
}