import React, { useState } from 'react';
import axios from 'axios';

import { NewItem } from '../add-new-item';


export const NewCardContainer = ({ setIsCreatingNew, listId, setIsListUpdated }) => {
    const [userInput, setUserInput] = useState('');
    
    const handleInput = e => {
        setUserInput(e.target.value);
    }

    const submitCard = async() => {
        const res = await axios.post(`/1/cards?idList=${listId}&name=${userInput}`);
        return res.data;
    }

    const handleSubmit = () => {
        try {
            submitCard();
            setUserInput('');
            setIsCreatingNew(false);
            setIsListUpdated(true);
        } catch (error) {
            console.log(error);
        }
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

