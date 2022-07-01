import React from 'react';
import { Container } from './card-title-styles';

const CardTitle = ({ children, isActive }) => {
    return <Container isActive={isActive}>{children}</Container>
};

export default CardTitle;