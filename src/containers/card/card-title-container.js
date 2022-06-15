import React, { useEffect, useState } from 'react'; 
import { useSelector } from 'react-redux';
import axios from 'axios';

import { CardTitle } from '../../components';



export const CardTitleContainer = () => {
    const card = useSelector(state => state.card.details);

    const [title, setTitle] = useState(card.name);
    const [isActive, setIsActive] = useState(false);
    const titleRef = React.useRef(null);


    useEffect(() => {
        if (isActive) {
            titleRef.current.select();
        }
    }, [isActive]);

    const handleChange = () => {
        const fetchChange = async() => {
            await axios.put(`/1/cards/${card.id}?name=${title}`)
        }

        if (title.trim().length > 0) {
            try {
                fetchChange();
            } catch (error) {
                console.log(error);
            }
        }
        else {
            setTitle(card.name);
        }
        setIsActive(false);
    };

    useEffect(() => {
        if (card.name !== title) {
            setTitle(card.name);
        }
    }, [card]);

    return (
        <CardTitle>
            <CardTitle.Title isActive={isActive} onClick={() => setIsActive(true)}>{title}</CardTitle.Title>
            <CardTitle.Input 
                ref={titleRef}
                isActive={isActive}
                onBlur={handleChange}
                value={title} 
                onChange={e => setTitle(e.target.value)}
            />

        </CardTitle>
    )
}