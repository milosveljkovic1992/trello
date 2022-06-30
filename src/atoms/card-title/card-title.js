import React from 'react';
import { Container,
    Title,
    Input,
    Subheading } from './card-title-styles';

const CardTitle = ({ children, ...restProps }) => {
    return <Container {...restProps}>{children}</Container>
};

CardTitle.Title = ({ children, ...restProps }) => {
    return <Title {...restProps}>{children}</Title>
};

CardTitle.Input = React.forwardRef(({ children, ...restProps }, ref) => {
    return <Input ref={ref} {...restProps}>{children}</Input>
});

CardTitle.Subheading = ({ children, ...restProps }) => {
    return <Subheading {...restProps}>{children}</Subheading>
};


export default CardTitle;