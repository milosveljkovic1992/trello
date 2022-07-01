import React from 'react';
import { Container } from 'components/atoms/card-title/card-title-styles';

export const CardTitle = ({ children, isActive }) => {
    return <Container isActive={isActive}>{children}</Container>
};