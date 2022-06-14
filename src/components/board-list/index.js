import React from 'react';
import { Container,
    Heading,
    Title } from './styles/board-list';

const BoardList = ({ children, ...restProps }) => {
    return <Container {...restProps}>{children}</Container>
};

BoardList.Heading = ({ children, ...restProps }) => {
    return <Heading {...restProps}>{children}</Heading>
};

BoardList.Title = React.forwardRef(({ children, ...restProps }, ref) => {
    return <Title ref={ref} {...restProps}>{children}</Title>
});


export default BoardList;