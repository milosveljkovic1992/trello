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
        e.stopPropagation();
        navigate(`/b/${card.idBoard}`);
        if (e.target.classList.contains('card-overlay')) dispatch(closeModal());
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
            handleDelete={handleDelete}
        />
    )
}