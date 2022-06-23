import React, { useState, useRef } from "react";
import axios from 'axios'
import { FaTrashAlt } from 'react-icons/fa';

import { BoardList } from "../../components";

export const ListHeading = ({ handleTitle, listId, listTitle, setListTitle, setIsBoardUpdated }) => {
    const titleRef = useRef(null);
    const [isInputActive, setIsInputActive] = useState(false);

    const handleSendToArchive = () => {
        const sendRequest = async() => {
            await axios.put(`/1/lists/${listId}?closed=true`)
            setIsBoardUpdated(true);
        }

        try {
            sendRequest();
        } catch (error) {
            console.log(error)
        }
    }
    
    const handleFocus = () => {
        setIsInputActive(true);
        titleRef.current.select();
    };

    const handleBlur = () => {
        handleTitle();
        setIsInputActive(false);
    }

    return (
        <BoardList.Heading isInputActive={isInputActive}>
            <BoardList.Title 
                onDrop={() => false}
                ref={titleRef} 
                value={listTitle} 
                onClick={handleFocus} 
                onChange={e => setListTitle(e.target.value)}
                onBlur={handleBlur}
            ></BoardList.Title>
            <BoardList.Actions className="delete-btn" onClick={handleSendToArchive}>
                <FaTrashAlt />
            </BoardList.Actions>
        </BoardList.Heading>
    )
};