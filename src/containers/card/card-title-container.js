import React, { useEffect, useState } from 'react'; 
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';

import { CardTitle } from '../../atoms';
import { informListUpdate } from '../../store/lists-slice';


export const CardTitleContainer = () => {
    const dispatch = useDispatch();
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
        const submitChange = async() => {
            axios.put(`/1/cards/${card.id}?name=${title}`);
        }

        if (title.trim().length > 0) {
            try {
                submitChange();
                dispatch(informListUpdate(card.idList));
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