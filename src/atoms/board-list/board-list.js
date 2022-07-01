import React from 'react';
import { Container,
    CardContainer } from './board-list-styles';

const BoardList = ({ children, ...restProps }) => {
    return <Container {...restProps}>{children}</Container>
};

BoardList.CardContainer = ({ children, ...restProps }) => {
    return <CardContainer {...restProps}>{children}</CardContainer>
};

export default BoardList;