import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux/es/exports';
import axios from 'axios';

import { CardDescription, CommentEdit, NewCard } from '../../components';
import { AiOutlineClose } from "react-icons/ai";

export const CardDescriptionContainer = () => {
    const card = useSelector(state => state.card.details);
    const { isLoading } = useSelector(state => state.card)
    const [isInitialRender, setIsInitialRender] = useState(true);
    const [description, setDescription] = useState('');
    const [isActive, setIsActive] = useState(false);

    const descRef = React.useRef(null);

    const handleEdit = () => {
        const fetchDescription = async() => {
            await axios.put(`/1/cards/${card.id}?desc=${description}`);
        };

        try {
            fetchDescription();
        } catch (error) {
            console.log(error)
        }
    };

    const handleActive = e => {
        if (e.target.closest('.desc-btn')) {
            setIsActive(false);
        } else {
            setIsActive(true);
        }
    };

    useEffect(() => {
        if (isActive) {
            descRef.current.select();
        }
    }, [isActive]);

    useEffect(() => {
        if (isInitialRender && !isLoading) {
            setDescription(card.desc)
            setIsInitialRender(false);
        }
    }, [isInitialRender, isLoading, card]);


    return (
        <CardDescription 
            isActive={isActive} 
            onClick={(e) => handleActive(e)} 
            className="desc-box"
            hasDescription={description}
        >
            <CardDescription.Text 
                isActive={isActive}
                hasDescription={description}
            >
                {description || "Add a more detailed description..."}
            </CardDescription.Text>

            <CardDescription.InputBox 
                className="desc-input"
                placeholder="Add a more detailed description..." 
                ref={descRef}
                isActive={isActive}
                value={description}
                onChange={e => setDescription(e.target.value)}
            ></CardDescription.InputBox>
            <CardDescription.IconContainer isActive={isActive}>
            <CommentEdit.ButtonContainer>
                <CommentEdit.Button 
                    className="desc-btn"
                    onClick={() => handleEdit()}
                >Save</CommentEdit.Button>

                <NewCard.IconContainer  
                    className="desc-btn" 
                    onClick={() => setIsActive(false)}
                >
                    <AiOutlineClose/>
                </NewCard.IconContainer>
            </CommentEdit.ButtonContainer>
            </CardDescription.IconContainer>
        </CardDescription>
    )
}