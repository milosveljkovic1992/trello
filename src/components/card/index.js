import React from 'react';
import { Container, 
    Title,
    Edit } from './styles/card';

const Card = React.forwardRef(({ children, ...restProps }, ref) => {
    return <Container ref={ref} {...restProps}>{children}</Container>
});

Card.Title = ({ children, ...restProps }) => {
    return <Title {...restProps}>{children}</Title>
};

Card.Edit = ({ children, ...restProps }) => {
    return <Edit {...restProps}>{children}</Edit>
};


export default Card;