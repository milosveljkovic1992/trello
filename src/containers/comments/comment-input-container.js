import React, { useState } from 'react';
import { CommentInput } from '../../components';

export const CommentInputContainer = ({ handleSubmit, comment, setComment }) => {
    const [isDisplayed, setIsDisplayed] = useState(false);

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