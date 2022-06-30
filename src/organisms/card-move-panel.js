import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { GrClose } from 'react-icons/gr';
import { CardMove } from '../atoms';
import { useParams } from 'react-router-dom';

export const CardMovePanel = ({ rect, card, setIsMoveOpen, handleMove }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [allLists, setAllLists] = useState(null);
    const [currentList, setCurrentList] = useState(null);
    const [selectedList, setSelectedList] = useState(null);
    const [selectedListId, setSelectedListId] = useState(null);
    const [selectedPosition, setSelectedPosition] = useState(0);

    const { boardId } = useParams();

    const getListsInfo = () => {
        const fetchAllLists = async() => {
            const response = await axios.get(`/1/boards/${boardId}/lists`)
            setAllLists(response.data);
        }

        const fetchCurrentList = async() => {
            const response = await axios.get(`/1/lists/${card.idList}/cards`)
            setCurrentList(response.data);
            setSelectedList(response.data);
            setSelectedListId(response.data[0].idList)
        }


        try {
            fetchAllLists();
            fetchCurrentList();
        } catch (error) {
            console.log(error);
        }
    };


    const handleSelect = (e) => {
        const listId = e.target.value;
        
        const fetchSelectedList = async() => {
            const response = await axios.get(`/1/lists/${listId}/cards`);
            setSelectedList(response.data);
            setSelectedListId(response.data[0].idList)
            setSelectedPosition(response.data[response.data.length - 1].pos + 10000)
        }

        try {
            fetchSelectedList();
        } catch (error) {
            console.log(error);
        }
    };

    const handlePosition = (e) => {
        const index = Number(e.target.value);

        if (index === 0) {
            setSelectedPosition(Math.round(selectedList[0].pos / 2) - 1);
        } else if (currentList[0].idList === selectedList[0].idList && index === selectedList.length - 1) {
            setSelectedPosition(selectedList[index].pos + 11000);
        } else if (index === selectedList.length) {
            setSelectedPosition(selectedList[index - 1].pos + 10000);

        } else {
            setSelectedPosition(selectedList[index].pos - Math.round((selectedList[index].pos - selectedList[index - 1].pos) / 2));
        }
    };

    useEffect(() => {
        if (!isLoading) {
            getListsInfo();
        }
        setIsLoading(false);
    }, [isLoading]);

    if (!allLists || !currentList) {
        return <></>
    }

    return (
        <CardMove 
            rect={rect} 
            position={rect.x + 300 > window.innerWidth ? 'right' : 'left'}
        >
            <CardMove.IconContainer onClick={() => setIsMoveOpen(false)}>
                <GrClose/>
            </CardMove.IconContainer>

            <CardMove.Title>Move card</CardMove.Title>
            <CardMove.Subtitle>Select destination</CardMove.Subtitle>
            <CardMove.OptionsContainer>
                <CardMove.DroplistContainer className="list-dropdown">
                    <CardMove.Label>List</CardMove.Label>
                    <CardMove.Dropdown onChange={handleSelect} value={selectedListId}>
                        {allLists && currentList && allLists.map(option => (
                                <CardMove.Option 
                                    key={`option-${option.id}`} 
                                    value={option.id}
                                >
                                    {option.name} {option.id === currentList[0].idList && '(current)'}
                                </CardMove.Option>
                        ))}
                    </CardMove.Dropdown>
                </CardMove.DroplistContainer>

                <CardMove.DroplistContainer className="position-dropdown">
                    <CardMove.Label>Position</CardMove.Label>
                    <CardMove.Dropdown onChange={handlePosition}>
                        {allLists && selectedList && selectedList.map((option, index) => (
                                <CardMove.Option 
                                    key={`option-${option.id}`} 
                                    value={index}
                                >
                                    {index + 1}
                                </CardMove.Option>
                        ))}
                        {currentList[0].idList !== selectedList[0].idList && 
                            <CardMove.Option value={selectedList.length}>{selectedList.length + 1}</CardMove.Option>
                        }
                    </CardMove.Dropdown>
                </CardMove.DroplistContainer>
            </CardMove.OptionsContainer>
            <CardMove.Button onClick={() => handleMove(card, selectedListId, selectedPosition)}>Move</CardMove.Button>
        </CardMove>
    )
};