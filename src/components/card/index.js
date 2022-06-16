import React from 'react';
import { Container, 
    Title,
    Delete } from './styles/card';

const Card = ({ children, ...restProps }) => {
    return <Container {...restProps}>{children}</Container>
};

Card.Title = ({ children, ...restProps }) => {
    return <Title {...restProps}>{children}</Title>
};

Card.Delete = ({ children, ...restProps }) => {
    return <Delete {...restProps}>{children}</Delete>
};


export default Card;