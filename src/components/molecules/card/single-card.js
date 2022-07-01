import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { TbPencil } from 'react-icons/tb';

import { getCard, deleteCard, renameCard } from 'store/card-slice';
import { informListUpdate } from 'store/lists-slice';
import { openModal } from 'store/popup-slice';
import { startDrag, dragOverCard, dragOverList, endDrag } from 'store/drag-drop-slice';

import { Card, Link } from 'components/atoms';
import { EditPanel } from 'components/organisms/edit-panel';


export const SingleCard = ({ index, card, cards, setCards, setIsListUpdated }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { draggedCard,
        targetListId,
        targetPosition } = useSelector(state => state.dragDrop);

    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isMoveOpen, setIsMoveOpen] = useState(false);
    const [title, setTitle] = useState(card.name);
    const [rect, setRect] = useState(null);
    
    const cardRef = React.useRef(null);

    const handleOpen = (card) => {
        const { id } = card;
        navigate(`c/${card.id}`);
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


    const handleDragStart = (e, card, index) => {
        const listId = card.idList;
        dispatch(startDrag(card));
        dispatch(dragOverList({ listId }));
        e.target.classList.add('drag-active');
    };


    const handleDragEnterCard = (e, card, index) => {
        let { pos } = card;
        const isFirst = index === 0;

        if (isFirst) {
            pos = pos / 2;
        }
        dispatch(dragOverCard({index, pos}))
    };

    const handleDragEnd = e => {
        const sendMoveRequest = async() => {
            await axios.put(`/1/cards/${draggedCard.id}?idList=${targetListId}&pos=${targetPosition}`)
        };

        try {
            sendMoveRequest();
            dispatch(endDrag());
            dispatch(informListUpdate(draggedCard));
            dispatch(informListUpdate(targetListId));
        } catch (error) {
            console.log(error);
        }

        e.target.classList.remove('drag-active');
    };



    return (
        <Card ref={cardRef} draggable>
            <Link 
                to={`c/${card.id}`} 
                draggable
                onDragStart={e => handleDragStart(e, card, index)}
                onDragEnter={e => handleDragEnterCard(e, card, index)}
                onDragEnd={e => handleDragEnd(e)}
            >
                <Card.Title>{card.name}</Card.Title>
            </Link>
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