import React from 'react'; 
import { Container, 
    Text,
    InputBox,
    IconContainer } from './styles/card-description';

const CardDescription = ({ children, ...restProps }) => {
    return <Container {...restProps}>{children}</Container>
};

CardDescription.Text = ({ children, ...restProps }) => {
    return <Text {...restProps}>{children}</Text>
};

CardDescription.InputBox = React.forwardRef(({ children, ...restProps }, ref) => {
    return <InputBox ref={ref} {...restProps}>{children}</InputBox>
});

CardDescription.IconContainer = ({ children, ...restProps }) => {
    return <IconContainer {...restProps}>{children}</IconContainer>
};

CardDescription.IconContainer = ({ children, ...restProps }) => {
    return <IconContainer {...restProps}>{children}</IconContainer>
};

export default CardDescription;