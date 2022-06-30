import React from 'react';
import { Container } from './add-btn-styles';

    
const AddBtn = ({ children, onClick, icon }) => {
    return (
        <Container onClick={onClick}>
            <span>{icon}</span>
            <span>{children}</span>
        </Container>
    )
};

export default AddBtn;