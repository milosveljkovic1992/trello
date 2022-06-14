import axios from 'axios';
import React, { useState } from 'react';
import { CommentInput } from '../../components';

export const CommentInputContainer = ({ id, setComments }) => {
    const [comment, setComment] = useState('');
    const [isDisplayed, setIsDisplayed] = useState(false);

    const handleSubmit = () => {
        const postComment = async() => {
            await axios.post(`/1/cards/${id}/actions/comments?text=${comment}`);
        };

        const getActions = async() => {
            const response = await axios.get(`/1/cards/${id}/actions`);
            setComments(response.data);
        };

        try {
            postComment();
            setComment('');
            getActions();
        } catch (error) {
            console.log(error);
        }
    }

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
                onClick={handleSubmit}
            >Save</CommentInput.Button>
        </CommentInput>
    )
};