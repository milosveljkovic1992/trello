import React from 'react';
import { Container } from './comment-edit-styles';

export const CommentEdit = ({ children, ...restProps }) => {
    return <Container {...restProps}>{children}</Container>
};