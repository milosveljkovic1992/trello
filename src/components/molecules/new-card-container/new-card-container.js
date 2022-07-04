import React, { useState } from 'react';

import axios from 'axios';

import { NewItem } from 'components/atoms';


export const NewCardContainer = ({ setIsCreatingNew, listId, setCards }) => {
    const [userInput, setUserInput] = useState('');
    
    const handleInput = e => {
        setUserInput(e.target.value);
    }

    const handleSubmit = () => {
        const submitCard = async() => {
            const response = await axios.post(`/1/cards?idList=${listId}&name=${userInput}`);
            setCards(cards => [...cards, response.data]);
        }

        if (userInput.trim().length > 0) {
            try {
                submitCard();
            } catch (error) {
                console.log(error);
            }
        }
        setUserInput('');
        setIsCreatingNew(false);
    }

    return (
        <NewItem 
            handleInput={handleInput}
            handleSubmit={handleSubmit}
            setIsCreatingNew={setIsCreatingNew}
            placeholder="Enter a title for this card..."
        >
            Add Card
        </NewItem>
        
    )
}

