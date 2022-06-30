import React from 'react';
import { Container,
    InputBox,
    Text,
    ButtonContainer,
    Button } from './comment-edit-styles';

const CommentEdit = ({ children, ...restProps }) => {
    return <Container {...restProps}>{children}</Container>
};

CommentEdit.InputBox = React.forwardRef(({ children, ...restProps }, ref) => {
    return <InputBox ref={ref} {...restProps}>{children}</InputBox>
});

CommentEdit.Text = ({ children, ...restProps }) => {
    return <Text {...restProps}>{children}</Text>
};

CommentEdit.ButtonContainer = ({ children, ...restProps }) => {
    return <ButtonContainer {...restProps}>{children}</ButtonContainer>
};

CommentEdit.Button = ({ children, ...restProps }) => {
    return <Button {...restProps}>{children}</Button>
};


export default CommentEdit;