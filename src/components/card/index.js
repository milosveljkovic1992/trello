import React from 'react';
import { Container, 
    Title } from './styles/card';

const Card = ({ children, ...restProps }) => {
    return <Container {...restProps}>{children}</Container>
};

Card.Title = ({ children, ...restProps }) => {
    return <Title {...restProps}>{children}</Title>
};


export default Card;