import React from 'react';
import { Container } from './comment-input-styles';

export const CommentInput = ({ children, isDisplayed }) => {
    return <Container isDisplayed={isDisplayed}>{children}</Container>
};