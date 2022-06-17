import React, { useState } from 'react';
import axios from 'axios';

import { NewItem } from '../add-new-item';


export const NewCardContainer = ({ setIsCreatingNew, listId, setIsListUpdated }) => {
    const [userInput, setUserInput] = useState('');
    
    const handleInput = e => {
        setUserInput(e.target.value);
    }

    const handleSubmit = () => {
        const submitCard = async() => {
            await axios.post(`/1/cards?idList=${listId}&name=${userInput}`);
        }

        if (userInput.trim().length > 0) {
            try {
                submitCard();
                
                setIsListUpdated(true);
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

