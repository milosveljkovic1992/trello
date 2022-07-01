import React, { useState, useEffect } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';
import { AiOutlineClose } from "react-icons/ai";

import { editComment } from 'store/comments-slice';
import { CommentEdit } from 'components/atoms';


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
            <textarea 
                ref={inputRef}
                placeholder="Write a comment..." 
                value={commentInput}
                onChange={e => setCommentInput(e.target.value)}
            ></textarea>

            <div className="btn-container">
                <button
                    disabled={!commentInput} 
                    onClick={() => handleEdit(comment.id, commentInput)}
                >Save</button>
                <div className="icon-container" onClick={() => setIsActive(false)}>
                    <AiOutlineClose/>
                </div>
                
            </div>
        </CommentEdit>
    )
};