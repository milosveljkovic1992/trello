import React, { useState } from 'react'; 
import { useSelector } from 'react-redux';
import axios from 'axios';

import { CommentInput } from '../../atoms';

export const CommentInputContainer = ({ setIsUpdated }) => {
    const card = useSelector(state => state.card.details);
    const [comment, setComment] = useState('');
    const [isDisplayed, setIsDisplayed] = useState(false);

    const handleSubmit = () => {
        const postComment = async() => {
            await axios.post(`/1/cards/${card.id}/actions/comments?text=${comment}`);
        };

        if (comment.trim().length > 0) {
            try {
                postComment();
            } catch (error) {
                console.log(error);
            }
        }
        setComment('');
        setIsUpdated(true);
        setIsDisplayed(false);
    };


    return (
        <CommentInput isDisplayed={isDisplayed}>
            <CommentInput.InputBox 
                placeholder="Write a comment..." 
                value={comment}
                onChange={e => setComment(e.target.value)}
                onFocus={() => setIsDisplayed(true)}
                onBlur={() => !comment && setIsDisplayed(false)}
            ></CommentInput.InputBox>
            <CommentInput.Button 
                isDisplayed={isDisplayed}
                disabled={!comment} 
                onClick={() => handleSubmit(comment, setComment)}
            >Save</CommentInput.Button>
        </CommentInput>
    )
};