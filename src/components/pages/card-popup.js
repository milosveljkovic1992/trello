import React, { useEffect, useState } from 'react'; 
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import axios from 'axios';

import { setComments } from 'store/comments-slice';
import { closeModal } from 'store/popup-slice';

import { CardOverlay } from 'components/templates/card-overlay/card-overlay';


export const CardPopup = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { cardUrl } = useParams();
    const card = useSelector(state => state.card.details);
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
            const response = await axios.get(`/1/cards/${cardUrl}/actions`);
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
    }, [dispatch, card, cardUrl, isLoading, isUpdated]);

    if (!card) {
        return <></>
    }

    return (
        <CardOverlay handleClose={handleClose} setIsUpdated={setIsUpdated} />
    )

}
