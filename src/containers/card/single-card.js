import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { TbPencil } from 'react-icons/tb';

import { Card } from '../../components';
import { getCard, deleteCard, renameCard } from '../../store/card-slice';
import { informListUpdate, resetListUpdate } from '../../store/lists-slice';
import { openModal } from '../../store/popup-slice';
import { EditPanel } from './edit-panel';
import axios from 'axios';

export const SingleCard = ({ card, cards, setCards }) => {
    const dispatch = useDispatch();
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isMoveOpen, setIsMoveOpen] = useState(false);
    const [title, setTitle] = useState(card.name);
    const [rect, setRect] = useState(null);
    
    const cardRef = React.useRef(null);

    const handleOpen = card => {
        const { id } = card;
        
        setIsEditOpen(false);
        try {
            dispatch(openModal(id));
            dispatch(getCard({ id }));
        } catch (error) {
            console.log(error);
        }
    };

    const handleRename = (card, title) => {
        const { id } = card;
        if (title.trim().length > 0) {
            try {
                dispatch(renameCard({id, title}));
                dispatch(informListUpdate(card.idList));
            } catch (error) {
                console.log(error);
            }
        }
        else {
            setTitle(card.name);
        }

        setIsEditOpen(false);
    };

    const handleDelete = (card) => {
        const { id } = card;
        try {
            const remainingCards = cards.filter(card => card.id !== id)
            dispatch(deleteCard({ id }));
            setCards(remainingCards);
        } catch (error) {
            console.log(error);
        }
        
    };
    
    const handleMove = (card, targetList, targetPosition) => {
        const sendMoveRequest = async() => {
            await axios.put(`/1/cards/${card.id}?idList=${targetList}&pos=${targetPosition}`)
        }

        try {
            sendMoveRequest();
            setIsEditOpen(false);
            setIsMoveOpen(false);
            dispatch(informListUpdate(card.idList));
            dispatch(informListUpdate(targetList));

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (isEditOpen) {
            setRect(cardRef.current.getBoundingClientRect());
        }
    }, [isEditOpen]);


    return (
        <Card ref={cardRef}>
            <Card.Title onClick={() => handleOpen(card)}>{card.name}</Card.Title>
            { isEditOpen && 
            <EditPanel 
                rect={rect}
                card={card} 
                title={title}
                setTitle={setTitle}
                isEditOpen={isEditOpen}
                setIsEditOpen={setIsEditOpen} 
                isMoveOpen={isMoveOpen}
                setIsMoveOpen={setIsMoveOpen}
                handleOpen={handleOpen}
                handleRename={handleRename}
                handleMove={handleMove}
                handleDelete={handleDelete}
            /> }
            <Card.Edit 
                className="edit-btn" 
                onClick={() => setIsEditOpen(true)}
            >
                <TbPencil />
            </Card.Edit>
        </Card>
    )
}