import React from 'react';
import { Container,
    Heading,
    CardContainer,
    Title,
    Actions } from './styles/board-list';

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

BoardList.Actions = ({ children, ...restProps }) => {
    return <Actions {...restProps}>{children}</Actions>
};


export default BoardList;