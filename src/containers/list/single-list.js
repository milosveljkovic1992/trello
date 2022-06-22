import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import axios from 'axios';

import { BoardList, Link } from '../../components';
import { ListHeading } from './list-heading';
import { AddCard } from '../buttons/add-card';
import { SingleCard } from '../card/single-card';
import { NewCardContainer } from '../card/new-card-container';
import { informListUpdate, resetListUpdate } from '../../store/lists-slice';


export const SingleList = ({ list, listId, name, setIsBoardUpdated, setLists }) => {
    const dispatch = useDispatch();
    const { isUpdated, updatedListId } = useSelector(state => state.lists);

    const [cards, setCards] = useState();
    const [isCreatingNew, setIsCreatingNew] = useState(false);
    const [isListUpdated, setIsListUpdated] = useState(false);
    const [listTitle, setListTitle] = useState(name);
    const [pos, setPos] = useState(1);

    const dragItem = React.useRef();
    const dragOverItem = React.useRef();

    const handleTitle = () => {
        const sendTitle = async() => {
            await axios.put(`/1/lists/${listId}?name=${listTitle}`);
            setIsListUpdated(false);
        }

        try {
            sendTitle();
        } catch(error) {
            console.log(error);
        }
    };

    const handleMove = async(card, targetList, targetPosition) => {
        const sendMoveRequest = async() => {
            await axios.put(`/1/cards/${card.id}?idList=${targetList}&pos=${targetPosition}`);
        }

        try {
            sendMoveRequest();
            dispatch(informListUpdate(card.idList));
            dispatch(informListUpdate(targetList));

        } catch (error) {
            console.log(error);
        }
    };

    const dragStart = (e, index, card) => {
        dragItem.current = e.target;
        dragItem.classList.add('placeholder');
    };



    const dragEnter = async(e, position, card) => {
        dragOverItem.current = {position, card};
    };

    const drop = (e, list) => {
        console.log(cards);
    };

    useEffect(() => {

        if (isUpdated && updatedListId === listId) {
            setIsListUpdated(true);
        }

        const fetchList = async() => {
            const res = await axios.get(`/1/lists/${listId}/cards`);
            setCards(res.data);
            dispatch(resetListUpdate());
        };
        
        try {
            fetchList();
            setIsListUpdated(false);
        } catch (error) {
            console.log(error);
        };

    }, [dispatch, isUpdated, updatedListId, listId, isListUpdated]);
    


    return (
        <>
        {cards && 
            <BoardList>
                <ListHeading 
                    handleTitle={handleTitle}
                    listId={listId} 
                    listTitle={listTitle} 
                    setListTitle={setListTitle} 
                    setIsBoardUpdated={setIsBoardUpdated}
                />
                <BoardList.CardContainer onDragEnd={(e) => drop(e, list)}>
                    {!isListUpdated && cards.map((card, index) => (
                        <Link 
                            key={card.id} 
                            draggable 
                            onMouseDown={(e) => dragStart(e, index, card)}
                            onDragEnter={(e) => dragEnter(e, index, card)}
                            
                            to={`c/${card.idShort}-${card.name.split(' ').join('-')}`} >
                        <SingleCard 
                            card={card}  
                            cards={cards}
                            setCards={setCards}
                            setLists={setLists}
                            setIsListUpdated={setIsListUpdated}
                            setIsBoardUpdated={setIsBoardUpdated}
                            
                        />
                        </Link>
                    ))}
                </BoardList.CardContainer>
                {!isCreatingNew 
                    ? <AddCard setIsCreatingNew={setIsCreatingNew} /> 
                    : <NewCardContainer 
                        setIsCreatingNew={setIsCreatingNew} 
                        listId={listId} 
                        setIsListUpdated={setIsListUpdated}
                      />
                }
            </BoardList>
        }
        </>
    )
};