import React from 'react';
import { Container } from 'components/atoms/comment-input/comment-input-styles';

export const CommentInput = ({ children, isDisplayed }) => {
    return <Container isDisplayed={isDisplayed}>{children}</Container>
};