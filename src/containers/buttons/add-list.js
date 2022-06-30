import React from 'react';
import { AddBtn } from '../../atoms';
import { AiOutlinePlus } from "react-icons/ai";

export const AddList = ({ setCreatingNewList }) => {

    const handleClick = () => {
        setCreatingNewList(true);
    }

    return (
        <AddBtn onClick={handleClick}>
            <AddBtn.IconContainer>
                <AiOutlinePlus />
            </AddBtn.IconContainer>
            <AddBtn.BtnText>Add another list</AddBtn.BtnText>
        </AddBtn>
    )
}