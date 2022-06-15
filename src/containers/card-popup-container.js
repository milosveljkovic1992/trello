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
    const isLoading = useSelector(state => state.card.isLoading);
    const [isUpdated, setIsUpdated] = useState(false);

    const handleClose = e => {
        if (e.target.classList.contains('card-overlay')) {
            navigate(`/b/${card.idBoard}`);
            dispatch(closeModal());
        }
    };

    useEffect(() => {
        const fetchComments = async() => {
            const response = await axios.get(`/1/cards/${card.id}/actions`);
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
    }, [dispatch, card, isLoading, isUpdated]);

    if (!card) {
        return <></>
    }

    return (
        <CardDetails handleClose={handleClose} setIsUpdated={setIsUpdated} />
    )

}
