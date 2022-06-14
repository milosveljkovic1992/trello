import React from 'react';
import { Container,
    IconContainer,
    BtnText } from './styles/add-btn';

    
const AddBtn = ({ children, ...restProps }) => {
    return <Container {...restProps}>{children}</Container>
};

AddBtn.IconContainer = ({ children, ...restProps }) => {
    return <IconContainer {...restProps}>{children}</IconContainer>
};

AddBtn.BtnText = ({ children, ...restProps }) => {
    return <BtnText {...restProps}>{children}</BtnText>
};

export default AddBtn;