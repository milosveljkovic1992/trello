import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux/es/exports';

import axios from 'axios';
import { AiOutlineClose } from "react-icons/ai";

import { NewCard } from 'components/atoms';

import { Container } from './card-description-styles';


export const CardDescription = () => {
    const card = useSelector(state => state.card.details);
    const { isLoading } = useSelector(state => state.card)
    const [isInitialRender, setIsInitialRender] = useState(true);
    const [description, setDescription] = useState('');
    const [previousDescription, setPreviousDescription] = useState('');
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
        setPreviousDescription(description);
    }, [isActive]);

    useEffect(() => {
        if (isInitialRender && !isLoading) {
            setDescription(card.desc)
            setIsInitialRender(false);
        }
    }, [isInitialRender, isLoading, card]);


    return (
        <Container 
            isActive={isActive} 
            onClick={(e) => handleActive(e)} 
            className="desc-box"
            hasDescription={description}
        >
            <p className="desc-content">{description || "Add a more detailed description..."}</p>

            <textarea 
                className="desc-input"
                placeholder="Add a more detailed description..." 
                ref={descRef}
                value={description}
                onChange={e => setDescription(e.target.value)}
            ></textarea>

            <div className="icon-container">
                <div className="btn-container">
                    <button
                        className="desc-btn"
                        onClick={() => handleEdit()}
                    >Save</button>

                    <NewCard.IconContainer  
                        className="desc-btn" 
                        onClick={() => {
                            setIsActive(false)
                            setDescription(previousDescription)
                        }}
                    >
                        <AiOutlineClose/>
                    </NewCard.IconContainer>
                </div>
            </div>
        </Container>
    )
}