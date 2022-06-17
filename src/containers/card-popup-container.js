import React, { useEffect, useState } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { CardDetails } from './card/card-details';
import { setComments } from '../store/comments-slice';
import { closeModal } from '../store/popup-slice';


export const CardPopupContainer = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const card = useSelector(state => state.card.details);
    const cardId = useSelector(state => state.popup.currentCardOpen);
    const isLoading = useSelector(state => state.card.isLoading);
    const [isUpdated, setIsUpdated] = useState(false);
    
    const handleClose = e => {
        if (e.target.classList.contains('card-overlay') ||
            e.target.classList.contains('close-btn') ||
            e.target.classList.contains('close-btn__icon')) 
            {
                navigate(`/b/${card.idBoard}`);
                dispatch(closeModal());
            }
    };

    useEffect(() => {
        const fetchComments = async() => {
            const response = await axios.get(`/1/cards/${cardId}/actions`);
            dispatch(setComments(response.data));
        };

        if (!isLoading || isUpdated) {
            try {
                fetchComments();
                setIsUpdated(false);
            } catch (error) {
                console.log(error);
            }
        }
    }, [dispatch, card, cardId, isLoading, isUpdated]);

    if (!card) {
        return <></>
    }

    return (
        <CardDetails handleClose={handleClose} setIsUpdated={setIsUpdated} />
    )

}
