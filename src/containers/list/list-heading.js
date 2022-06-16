import React, { useRef } from "react";
import axios from 'axios'
import { FaTrashAlt } from 'react-icons/fa';

import { BoardList } from "../../components";

export const ListHeading = ({ handleTitle, listId, listTitle, setListTitle, setIsBoardUpdated }) => {
    const titleRef = useRef(null);

    const handleArchive = () => {
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
        titleRef.current.select();
    }

    return (
        <BoardList.Heading>
            <BoardList.Title 
                ref={titleRef} 
                value={listTitle} 
                onClick={handleFocus} 
                onChange={e => setListTitle(e.target.value)}
                onBlur={handleTitle}
            ></BoardList.Title>
            <BoardList.Delete onClick={handleArchive}>
                <FaTrashAlt />
            </BoardList.Delete>
        </BoardList.Heading>
    )
};