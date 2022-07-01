import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';
import { AiOutlinePlus } from "react-icons/ai";

import { AddButton, BoardList } from 'components/atoms';
import { ListHeading, NewCardContainer, SingleCard } from 'components/molecules';

import { resetListUpdate } from 'store/lists-slice';
import { dragOverList } from 'store/drag-drop-slice';


export const SingleList = ({ listId, name, setIsBoardUpdated }) => {
    const dispatch = useDispatch();
    const { isUpdated, updatedListId } = useSelector(state => state.lists);
    const { targetListId } = useSelector(state => state.dragDrop);

    const [cards, setCards] = useState();
    const [isCreatingNew, setIsCreatingNew] = useState(false);
    const [isListUpdated, setIsListUpdated] = useState(false);
    const [listTitle, setListTitle] = useState(name);

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

    const handleDragEnterList = (listId) => {
        if (listId !== targetListId) {
            dispatch(dragOverList({ listId }));
        }
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
            <BoardList onDragEnter={() => handleDragEnterList(listId)}>
                <ListHeading 
                    handleTitle={handleTitle}
                    listId={listId} 
                    listTitle={listTitle} 
                    setListTitle={setListTitle} 
                    setIsBoardUpdated={setIsBoardUpdated}
                />
                <BoardList.CardContainer>
                    {cards.map((card, index) => (
                        <SingleCard 
                            key={card.id} 
                            index={index}
                            card={card}  
                            cards={cards}
                            setCards={setCards}
                            setIsListUpdated={setIsListUpdated}
                        />
                    ))}
                </BoardList.CardContainer>
                {!isCreatingNew 
                    ? <AddButton onClick={() => setIsCreatingNew(true)} icon={<AiOutlinePlus />}>
                        Add a card
                      </AddButton>
                    : <NewCardContainer 
                        setIsCreatingNew={setIsCreatingNew} 
                        listId={listId} 
                        setCards={setCards}
                      />
                }
            </BoardList>
        }
        </>
    )
};