import React from 'react';
import { Overlay,
    Container,
    InputBox,
    OptionsContainer,
    Tab,
    IconContainer,
    Label,
    Button } from './card-edit-styles';

const CardEdit = ({ children, ...restProps }) => {
    return <Overlay {...restProps}>{children}</Overlay>
};

CardEdit.Container = ({ children, ...restProps }) => {
    return <Container {...restProps}>{children}</Container>
};

CardEdit.InputBox = React.forwardRef(({ children, ...restProps }, ref) => {
    return <InputBox ref={ref} {...restProps}>{children}</InputBox>
});

CardEdit.OptionsContainer = React.forwardRef(({ children, ...restProps }, ref) => {
    return <OptionsContainer ref={ref} {...restProps}>{children}</OptionsContainer>
});

CardEdit.Tab = React.forwardRef(({ children, ...restProps }, ref) => {
    return <Tab ref={ref} {...restProps}>{children}</Tab>
});

CardEdit.IconContainer = ({ children, ...restProps }) => {
    return <IconContainer {...restProps}>{children}</IconContainer>
};

CardEdit.Label = ({ children, ...restProps }) => {
    return <Label {...restProps}>{children}</Label>
};

CardEdit.Button = ({ children, ...restProps }) => {
    return <Button {...restProps}>{children}</Button>
};


export default CardEdit;