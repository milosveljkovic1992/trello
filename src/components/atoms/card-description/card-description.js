import React from 'react'; 
import { Container } from './card-description-styles';

export const CardDescription = ({ children, hasDescription, isActive, onClick }) => {
    return (
        <Container 
            isActive={isActive} 
            hasDescription={hasDescription} 
            onClick={onClick}
        >
            {children}
        </Container>
    )
};