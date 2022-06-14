import React from 'react';
import { Container,
    InputBox,
    Text,
    Button } from './styles/comment-input';

const CommentInput = ({ children, ...restProps }) => {
    return <Container {...restProps}>{children}</Container>
};

CommentInput.InputBox = ({ children, ...restProps }) => {
    return <InputBox {...restProps}>{children}</InputBox>
};

CommentInput.Text = ({ children, ...restProps }) => {
    return <Text {...restProps}>{children}</Text>
};

CommentInput.Button = ({ children, ...restProps }) => {
    return <Button {...restProps}>{children}</Button>
};


export default CommentInput;