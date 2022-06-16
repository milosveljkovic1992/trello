import React from 'react';
import { useDispatch } from 'react-redux';
import { FaTrashAlt } from 'react-icons/fa';

import { Card, Link } from '../../components';
import { getCard, deleteCard } from '../../store/card-slice';
import { openModal } from '../../store/popup-slice';

export const SingleCard = ({ card, cards, setCards }) => {
    const dispatch = useDispatch();

    const handleClick = card => {
        const { id } = card;
        dispatch(openModal(id));
        dispatch(getCard({ id }));
    }

    const handleDelete = (card) => {
        const { id } = card;
        dispatch(deleteCard({ id }));
        const remainingCards = cards.filter(card => card.id !== id)
        setCards(remainingCards);
    }

    return (
        <Card>
            <Link to={`c/${card.idShort}-${card.name.split(' ').join('-')}`} key={Math.random()}>
                <Card.Title onClick={() => handleClick(card)}>{card.name}</Card.Title>
            </Link>
            <Card.Delete onClick={() => handleDelete(card)}>
                <FaTrashAlt />
            </Card.Delete>
        </Card>
    )
}