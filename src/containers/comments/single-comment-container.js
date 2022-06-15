import React, { useState } from 'react'; 
import { useSelector, useDispatch } from 'react-redux/es/exports';
import axios from 'axios';
import { deleteComment } from '../../store/comments-slice';

import { SingleComment } from '../../components';
import { CommentEditContainer } from './comment-edit-container';

export const SingleCommentContainer = ({ comment }) => {
    const dispatch = useDispatch();
    const card = useSelector(state => state.card.details);

    const [isActive, setIsActive] = useState(false);

    const handleDelete = () => {
        const deleteRequest = async() => {
            await axios.delete(`/1/cards/${card.id}/actions/${comment.id}/comments`);
        };

        try {
            deleteRequest();
            dispatch(deleteComment(comment));
        } catch (error) {
            console.log(error);
        }
    }


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
                    {!isActive 
                    ?
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
                            isActive={isActive}
                            setIsActive={setIsActive}
                        />

                        
                    }
                </SingleComment.DetailsContainer>
            </SingleComment.Inner>
        </SingleComment>
    )
}