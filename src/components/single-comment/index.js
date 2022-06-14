import React from 'react';
import { Container,
    Inner,
    Icon,
    DetailsContainer,
    Name,
    Timestamp,
    CommentTextContainer,
    CommentText,
    Actions,
    Delete } from './styles/single-comment';

const SingleComment = ({ children, ...restProps }) => {
    return <Container {...restProps}>{children}</Container>
};

SingleComment.Inner = ({ children, ...restProps }) => {
    return <Inner {...restProps}>{children}</Inner>
};

SingleComment.Icon = ({ children, ...restProps }) => {
    return <Icon {...restProps}>{children}</Icon>
};

SingleComment.DetailsContainer = ({ children, ...restProps }) => {
    return <DetailsContainer {...restProps}>{children}</DetailsContainer>
};

SingleComment.Name = ({ children, ...restProps }) => {
    return <Name {...restProps}>{children}</Name>
};

SingleComment.Timestamp = ({ children, ...restProps }) => {
    return <Timestamp {...restProps}>{children}</Timestamp>
};

SingleComment.CommentTextContainer = ({ children, ...restProps }) => {
    return <CommentTextContainer {...restProps}>{children}</CommentTextContainer>
};

SingleComment.CommentText = ({ children, ...restProps }) => {
    return <CommentText {...restProps}>{children}</CommentText>
};

SingleComment.Actions = ({ children, ...restProps }) => {
    return <Actions {...restProps}>{children}</Actions>
};

SingleComment.Delete = ({ children, ...restProps }) => {
    return <Delete {...restProps}>{children}</Delete>
};

export default SingleComment;