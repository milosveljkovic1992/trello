import React from 'react';
import { Container } from 'components/atoms/add-button/add-button-styles';

    
export const AddButton = ({ children, onClick, icon }) => {
    return (
        <Container onClick={onClick}>
            <span>{icon}</span>
            <span>{children}</span>
        </Container>
    )
};