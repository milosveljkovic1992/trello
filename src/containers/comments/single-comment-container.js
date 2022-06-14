import React from 'react';
import { SingleComment } from '../../components';

export const SingleCommentContainer = ({ comment, handleDelete }) => {

    return (
        <SingleComment key={comment.id}>
            <SingleComment.Icon></SingleComment.Icon>
            <SingleComment.Inner>
                <SingleComment.DetailsContainer>
                    <SingleComment.Name>{comment.memberCreator.fullName}</SingleComment.Name>
                    <SingleComment.Timestamp>
                        {`${new Date(comment.date).toLocaleDateString('sr-RS')} at 
                        ${new Date(comment.date).toLocaleTimeString('sr-RS')} 
                        `}
                    </SingleComment.Timestamp>
                    <SingleComment.CommentTextContainer>
                        <SingleComment.CommentText>{comment.data.text}</SingleComment.CommentText>
                    </SingleComment.CommentTextContainer>
                    <SingleComment.Actions>
                        <SingleComment.Delete onClick={() => handleDelete(comment.id)}>Delete</SingleComment.Delete>
                    </SingleComment.Actions>
                </SingleComment.DetailsContainer>
            </SingleComment.Inner>
        </SingleComment>
    )
}