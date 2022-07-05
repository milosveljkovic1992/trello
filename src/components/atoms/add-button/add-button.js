import React from 'react';
import { Container } from './add-button-styles';

    
export const AddButton = ({ children, onClick, icon }) => {
    return (
        <Container onClick={onClick}>
            <span>{icon}</span>
            <span>{children}</span>
        </Container>
    )
};