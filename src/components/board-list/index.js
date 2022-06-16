import React from 'react';
import { Container,
    Heading,
    CardContainer,
    Title,
    Delete } from './styles/board-list';

const BoardList = ({ children, ...restProps }) => {
    return <Container {...restProps}>{children}</Container>
};

BoardList.Heading = ({ children, ...restProps }) => {
    return <Heading {...restProps}>{children}</Heading>
};

BoardList.CardContainer = ({ children, ...restProps }) => {
    return <CardContainer {...restProps}>{children}</CardContainer>
};

BoardList.Title = React.forwardRef(({ children, ...restProps }, ref) => {
    return <Title ref={ref} {...restProps}>{children}</Title>
});

BoardList.Delete = ({ children, ...restProps }) => {
    return <Delete {...restProps}>{children}</Delete>
};


export default BoardList;