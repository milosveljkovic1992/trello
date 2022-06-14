import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { CardDetails } from './card/card-details';
import { getCard } from '../store/card-slice';
import { closeModal } from '../store/popup-slice';


export const CardPopupContainer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const card = useSelector(state => state.card.details);
    const isLoading = useSelector(state => state.card.isLoading);

    const [comments, setComments] = useState([]);

    const handleClose = e => {
        if (e.target.classList.contains('card-overlay')) {
            navigate(`/b/${card.idBoard}`);
            dispatch(closeModal());
        }
    }

    const handleDelete = commentId => {
        axios.delete(`/1/cards/${card.id}/actions/${commentId}/comments`);
        const getActions = async() => {
            const response = await axios.get(`/1/cards/${card.id}/actions`);
            setComments(response.data);
        };

        try {
            getActions();
            dispatch(getCard());
        } catch (error) {
            console.log(error);
        }
    }

    const handleSubmit = (comment, setComment) => {
        const postComment = async() => {
            await axios.post(`/1/cards/${card.id}/actions/comments?text=${comment}`);
        };

        const getActions = async() => {
            const response = await axios.get(`/1/cards/${card.id}/actions`);
            setComments(response.data);
        };

        try {
            postComment();
            setComment('');
            getActions();
            dispatch(getCard());
        } catch (error) {
            console.log(error);
        }
    }

    const handleEdit = (comment, commentInput, setIsActive) => {
        axios.put(`/1/cards/${card.id}/actions/${comment.id}/comments?text=${commentInput}`);
        const getActions = async() => {
            const response = await axios.get(`/1/cards/${card.id}/actions`);
            setComments(response.data);
        };

        try {
            getActions();
            dispatch(getCard());
            setIsActive(false);
        } catch (error) {
            console.log(error);
        }
    }
    

    useEffect(() => {
        const getActions = async() => {
            const response = await axios.get(`/1/cards/${card.id}/actions`);
            setComments(response.data);
        };

        if (!isLoading) {
            try {
                getActions();
            } catch(error) {
                console.log(error);
            }
        }
    }, [isLoading, card]);

    if (!card) {
        return <></>
    }

    return (
        <CardDetails 
            card={card}
            comments={comments}
            setComments={setComments}
            handleClose={handleClose}
            handleSubmit={handleSubmit}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
        />
    )
}