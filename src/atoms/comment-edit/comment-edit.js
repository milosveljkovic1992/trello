import React from 'react';
import { Container } from './comment-edit-styles';

const CommentEdit = ({ children, ...restProps }) => {
    return <Container {...restProps}>{children}</Container>
};

export default CommentEdit;