import React from 'react';
import { Container, 
    Title,
    Edit,
    Placeholder } from './card-styles';

const Card = React.forwardRef(({ children, ...restProps }, ref) => {
    return <Container ref={ref} {...restProps}>{children}</Container>
});

Card.Title = ({ children, ...restProps }) => {
    return <Title {...restProps}>{children}</Title>
};

Card.Edit = ({ children, ...restProps }) => {
    return <Edit {...restProps}>{children}</Edit>
};

Card.Placeholder = ({ children, ...restProps }) => {
    return <Placeholder {...restProps}>{children}</Placeholder>
};


export default Card;