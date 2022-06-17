import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';

import { BoardList } from '../../components';
import { ListHeading } from './list-heading';
import { AddCard } from '../buttons/add-card';
import { SingleCard } from '../card/single-card';
import { NewCardContainer } from '../card/new-card-container';
import { resetListUpdate } from '../../store/lists-slice';


export const SingleList = ({ listId, name, setIsBoardUpdated, setLists }) => {
    const dispatch = useDispatch();
    const { isUpdated, updatedListId } = useSelector(state => state.lists);

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
    }
    
    
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
                <BoardList.CardContainer>
                    {!isListUpdated && cards.map(card => (
                        <SingleCard 
                            key={card.id} 
                            card={card}  
                            cards={cards}
                            setCards={setCards}
                            setLists={setLists}
                            setIsListUpdated={setIsListUpdated}
                            setIsBoardUpdated={setIsBoardUpdated}
                        />
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