import React from 'react';
import { Container,
    Title,
    Subtitle,
    OptionsContainer,
    DroplistContainer,
    Label,
    Dropdown,
    Option,
    IconContainer,
    Button } from './styles/card-move';

const CardMove = ({ children, ...restProps }) => {
    return <Container {...restProps}>{children}</Container>
};

CardMove.Title = ({ children, ...restProps }) => {
    return <Title {...restProps}>{children}</Title>
};

CardMove.Subtitle = ({ children, ...restProps }) => {
    return <Subtitle {...restProps}>{children}</Subtitle>
};

CardMove.OptionsContainer = ({ children, ...restProps }) => {
    return <OptionsContainer {...restProps}>{children}</OptionsContainer>
};

CardMove.DroplistContainer = ({ children, ...restProps }) => {
    return <DroplistContainer {...restProps}>{children}</DroplistContainer>
};

CardMove.Label = ({ children, ...restProps }) => {
    return <Label {...restProps}>{children}</Label>
};

CardMove.Dropdown = ({ children, ...restProps }) => {
    return <Dropdown {...restProps}>{children}</Dropdown>
};

CardMove.Option = ({ children, ...restProps }) => {
    return <Option {...restProps}>{children}</Option>
};

CardMove.IconContainer = ({ children, ...restProps }) => {
    return <IconContainer {...restProps}>{children}</IconContainer>
};

CardMove.Button = ({ children, ...restProps }) => {
    return <Button {...restProps}>{children}</Button>
};


export default CardMove;