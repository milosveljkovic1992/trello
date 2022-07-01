import React from 'react';
import { Container,
    Inner,
    Heading,
    HeadingText,
    CardsContainer,
    SingleCardContainer,
    Card,
    Title,
    Input,
    Button,
    Delete, 
    Logout } from './board-select-styles';

export const BoardSelect = ({ children, ...restProps }) => {
    return <Container {...restProps}>{children}</Container>
};

BoardSelect.Inner = ({ children, ...restProps }) => {
    return <Inner {...restProps}>{children}</Inner>
};

BoardSelect.Heading = ({ children, ...restProps }) => {
    return <Heading {...restProps}>{children}</Heading>
};

BoardSelect.HeadingText = ({ children, ...restProps }) => {
    return <HeadingText {...restProps}>{children}</HeadingText>
};

BoardSelect.CardsContainer = ({ children, ...restProps }) => {
    return <CardsContainer {...restProps}>{children}</CardsContainer>
};

BoardSelect.SingleCardContainer = ({ children, ...restProps }) => {
    return <SingleCardContainer {...restProps}>{children}</SingleCardContainer>
};

BoardSelect.Card = ({ children, ...restProps }) => {
    return <Card {...restProps}>{children}</Card>
};

BoardSelect.Title = ({ children, ...restProps }) => {
    return <Title {...restProps}>{children}</Title>
};

BoardSelect.Input = React.forwardRef(({ children, ...restProps }, ref) => {
    return <Input ref={ref} {...restProps}>{children}</Input>
});

BoardSelect.Button = React.forwardRef(({ children, ...restProps }, ref) => {
    return <Button ref={ref} {...restProps}>{children}</Button>
});

BoardSelect.Delete = ({ children, ...restProps }) => {
    return <Delete {...restProps}>{children}</Delete>
};

BoardSelect.Logout = ({ children, ...restProps }) => {
    return <Logout {...restProps}>{children}</Logout>
};