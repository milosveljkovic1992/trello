import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios';

import { BoardList, Link } from '../../components';
import { ListHeading } from './list-heading';
import { AddCard } from '../buttons/add-card';
import { SingleCard } from '../card/single-card';
import { NewCardContainer } from '../card/new-card-container';
import { resetListUpdate } from '../../store/lists-slice';


export const SingleList = ({ listId, name }) => {
    const dispatch = useDispatch();
    const { isUpdated, updatedListId } = useSelector(state => state.lists);

    const [cards, setCards] = useState();
    const [isCreatingNew, setIsCreatingNew] = useState(false);
    const [isListUpdated, setIsListUpdated] = useState(false);
    
    
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
        {cards && !isListUpdated && 
            <BoardList>
                <ListHeading title={name} />
                {cards.map(card => (
                    <Link to={`c/${card.idShort}-${card.name.split(' ').join('-')}`} key={Math.random()}>
                    <SingleCard 
                        key={card.id} 
                        card={card}  
                    />
                    </Link>
                ))}
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