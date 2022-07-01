import React from 'react';
import { Container } from './comment-input-styles';

const CommentInput = ({ children, isDisplayed }) => {
    return <Container isDisplayed={isDisplayed}>{children}</Container>
}; 

export default CommentInput;