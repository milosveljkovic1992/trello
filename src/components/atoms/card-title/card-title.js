import React from 'react';
import { Container } from './card-title-styles';

export const CardTitle = ({ children, isActive }) => {
    return <Container isActive={isActive}>{children}</Container>
};