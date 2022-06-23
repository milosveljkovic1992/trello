import React from 'react';
import { 
    Container, 
    Header,
    TitleContainer,
    Title, 
    Button,
    IconContainer,
    TitleInput,
    Inner } from './styles/board';

const Board = ({ children, ...restProps }) => {
    return <Container {...restProps}>{children}</Container>
};

Board.Header = ({ children, ...restProps }) => {
    return <Header {...restProps}>{children}</Header>
};

Board.TitleContainer = ({ children, ...restProps }) => {
    return <TitleContainer {...restProps}>{children}</TitleContainer>
};

Board.Title = ({ children, ...restProps }) => {
    return <Title {...restProps}>{children}</Title>
};

Board.Button = ({ children, ...restProps }) => {
    return <Button {...restProps}>{children}</Button>
};

Board.IconContainer = ({ children, ...restProps }) => {
    return <IconContainer {...restProps}>{children}</IconContainer>
};

Board.TitleInput = React.forwardRef(({ children, ...restProps }, ref) => {
    return <TitleInput ref={ref} {...restProps}>{children}</TitleInput>
});

Board.Inner = ({ children, ...restProps }) => {
    return <Inner {...restProps}>{children}</Inner>
};

export default Board;