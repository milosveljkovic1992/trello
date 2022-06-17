import React, { useState, useEffect } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import { CommentEdit } from '../../components';
import { NewCard } from '../../components';
import { AiOutlineClose } from "react-icons/ai";
import { editComment } from '../../store/comments-slice';

export const CommentEditContainer = ({ comment, isActive, setIsActive }) => {
    const dispatch = useDispatch();
    const card = useSelector(state => state.card.details);
    const [commentInput, setCommentInput] = useState(comment.data.text);

    const inputRef = React.useRef();

    useEffect(() => {
        if (isActive) {
            inputRef.current.select();
        }
    }, [isActive]);

    const handleEdit = (id, value) => {
        const editRequest = async() => {
            await axios.put(`/1/cards/${card.id}/actions/${id}/comments?text=${value}`)
        };

        if (value.trim().length > 0) {
            try {
                editRequest();
                dispatch(editComment({id, value}));
            } catch (error) {
                console.log(error);
            }
        } else {
            setCommentInput(comment.data.text);
        }
        setIsActive(false);
    };


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
                    onClick={() => handleEdit(comment.id, commentInput)}
                >Save</CommentEdit.Button>
                <NewCard.IconContainer onClick={() => setIsActive(false)}>
                    <AiOutlineClose/>
                </NewCard.IconContainer>
            </CommentEdit.ButtonContainer>
        </CommentEdit>
    )
};