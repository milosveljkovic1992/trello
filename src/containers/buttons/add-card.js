import React from 'react';
import { AddBtn } from '../../components';
import { AiOutlinePlus } from "react-icons/ai";

export const AddCard = ({ setIsCreatingNew }) => {


    return (
        <AddBtn onClick={() => setIsCreatingNew(true)}>
            <AddBtn.IconContainer>
                <AiOutlinePlus />
            </AddBtn.IconContainer>
            <AddBtn.BtnText>Add a card</AddBtn.BtnText>
        </AddBtn>
    )
}