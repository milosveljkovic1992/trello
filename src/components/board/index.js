import React from 'react';
import { 
    Container, 
    Header,
    Title, 
    TitleInput,
    Inner } from './styles/board';

const Board = ({ children, ...restProps }) => {
    return <Container {...restProps}>{children}</Container>
};

Board.Header = ({ children, ...restProps }) => {
    return <Header {...restProps}>{children}</Header>
};

Board.Title = ({ children, ...restProps }) => {
    return <Title {...restProps}>{children}</Title>
};

Board.TitleInput = React.forwardRef(({ children, ...restProps }, ref) => {
    return <TitleInput ref={ref} {...restProps}>{children}</TitleInput>
});

Board.Inner = ({ children, ...restProps }) => {
    return <Inner {...restProps}>{children}</Inner>
};

export default Board;