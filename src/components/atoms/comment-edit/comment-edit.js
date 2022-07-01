import React from 'react';
import { Container } from 'components/atoms/comment-edit/comment-edit-styles';

export const CommentEdit = ({ children, ...restProps }) => {
    return <Container {...restProps}>{children}</Container>
};