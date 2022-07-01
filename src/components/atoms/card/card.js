import React from 'react';
import { Container, 
    Title,
    Edit,
    Placeholder } from 'components/atoms/card/card-styles';

export const Card = React.forwardRef(({ children, ...restProps }, ref) => {
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