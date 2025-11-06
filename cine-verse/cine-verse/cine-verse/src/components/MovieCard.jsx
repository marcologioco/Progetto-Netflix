import React from 'react';
import { Card } from 'react-bootstrap';
export default function MovieCard({ title, poster, overview }) {

    return (
        <Card style={{ width: '12rem' }}>
            <Card.Img variant='top' src={poster} />
            <Card.Body>
                <Card.Title>{title}
                </Card.Title>
                <Card.Text style={{ fontSize: '0.8rem' }}>
                    {overview}
                </Card.Text>
            </Card.Body>
        </Card>)
}