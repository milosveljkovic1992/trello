import React from 'react';
import { Container,
    InputContainer,
    InputBox,
    ButtonContainer,
    Button,
    IconContainer } from './styles/new-card';

const NewCard = ({ children, ...restProps }) => {
    return <Container {...restProps}>{children}</Container>
};

NewCard.InputContainer = ({ children, ...restProps }) => {
    return <InputContainer {...restProps}>{children}</InputContainer>
};

NewCard.InputBox = React.forwardRef(({ children, placeholder, ...restProps }, ref) => {
    return <InputBox ref={ref} placeholder={placeholder} {...restProps}>{children}</InputBox>
});

NewCard.ButtonContainer = ({ children, ...restProps }) => {
    return <ButtonContainer {...restProps}>{children}</ButtonContainer>
};

NewCard.Button = ({ children, ...restProps }) => {
    return <Button {...restProps}>{children}</Button>
};

NewCard.IconContainer = ({ children, ...restProps }) => {
    return <IconContainer {...restProps}>{children}</IconContainer>
};

export default NewCard;