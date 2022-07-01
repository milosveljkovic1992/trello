import React from 'react';
import { Container,
    CardContainer } from 'components/atoms/board-list/board-list-styles';

export const BoardList = ({ children, ...restProps }) => {
    return <Container {...restProps}>{children}</Container>
};

BoardList.CardContainer = ({ children, ...restProps }) => {
    return <CardContainer {...restProps}>{children}</CardContainer>
};