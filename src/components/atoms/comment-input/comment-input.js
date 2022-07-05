import React, { useState } from 'react'; 
import { useSelector } from 'react-redux';

import axios from 'axios';

import { Container } from './comment-input-styles';


export const CommentInput = ({ setIsUpdated }) => {
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
        <Container isDisplayed={isDisplayed}>
            <textarea 
                placeholder="Write a comment..." 
                value={comment}
                onChange={e => setComment(e.target.value)}
                onFocus={() => setIsDisplayed(true)}
                onBlur={() => !comment && setIsDisplayed(false)}
            ></textarea>
            <button 
                disabled={!comment} 
                onClick={() => handleSubmit(comment, setComment)}
            >Save</button>
        </Container>
    )
};