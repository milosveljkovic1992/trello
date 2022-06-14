import React from 'react';
import { useDispatch } from 'react-redux';

import { Card } from '../../components';
import { getCard } from '../../store/card-slice';
import { openModal } from '../../store/popup-slice';

export const SingleCard = ({ card }) => {
    const dispatch = useDispatch();

    const handleClick = card => {
        const { id } = card;
        dispatch(openModal(id));
        dispatch(getCard({ id }));
    }

    return (
        <Card onClick={() => handleClick(card)}>
            <Card.Title>{card.name}</Card.Title>
        </Card>
    )
}