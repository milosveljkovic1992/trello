import React, { useState } from 'react';

import { SingleComment } from '../../components';
import { CommentEditContainer } from './comment-edit-container';

export const SingleCommentContainer = ({ comment, handleEdit, handleDelete }) => {
    const [isActive, setIsActive] = useState(false);
    const [commentInput, setCommentInput] = useState(comment.data.text);


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
                    {!isActive ?
                        <>
                            <SingleComment.CommentTextContainer>
                                <SingleComment.CommentText>{comment.data.text}</SingleComment.CommentText>
                            </SingleComment.CommentTextContainer>
                            <SingleComment.Actions>
                                <SingleComment.ActionText onClick={() => setIsActive(true)}>Edit</SingleComment.ActionText> 
                                {` - `}
                                <SingleComment.ActionText onClick={() => handleDelete(comment.id)}>Delete</SingleComment.ActionText>
                            </SingleComment.Actions>
                        </>

                        :

                        <CommentEditContainer 
                            comment={comment}
                            handleEdit={handleEdit}
                            commentInput={commentInput}
                            setCommentInput={setCommentInput}
                            isActive={isActive}
                            setIsActive={setIsActive}
                        />

                        
                    }
                </SingleComment.DetailsContainer>
            </SingleComment.Inner>
        </SingleComment>
    )
}