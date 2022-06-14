import React from 'react';
import { 
    Container, 
    Header, 
    Inner } from './styles/board';

const Board = ({ children, ...restProps }) => {
    return <Container {...restProps}>{children}</Container>
};

Board.Header = ({ children, ...restProps }) => {
    return <Header {...restProps}>{children}</Header>
};

Board.Inner = ({ children, ...restProps }) => {
    return <Inner {...restProps}>{children}</Inner>
};

export default Board;