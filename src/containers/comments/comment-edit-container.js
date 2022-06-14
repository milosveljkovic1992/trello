import React, { useEffect } from 'react';
import { CommentEdit } from '../../components';
import { NewCard } from '../../components';
import { AiOutlineClose } from "react-icons/ai";

export const CommentEditContainer = ({ comment, handleEdit, commentInput, setCommentInput, isActive, setIsActive }) => {

    const inputRef = React.useRef()

    useEffect(() => {
        if (isActive) {
            inputRef.current.select();
        }
    }, [isActive]);

    return (
        <CommentEdit>
            <CommentEdit.InputBox 
                ref={inputRef}
                placeholder="Write a comment..." 
                value={commentInput}
                onChange={e => setCommentInput(e.target.value)}
            ></CommentEdit.InputBox>
            <CommentEdit.ButtonContainer>
                <CommentEdit.Button 
                    disabled={!commentInput} 
                    onClick={() => handleEdit(comment, commentInput, setIsActive)}
                >Save</CommentEdit.Button>
                <NewCard.IconContainer>
                    <AiOutlineClose onClick={() => setIsActive(false)}/>
                </NewCard.IconContainer>
            </CommentEdit.ButtonContainer>
        </CommentEdit>
    )
};