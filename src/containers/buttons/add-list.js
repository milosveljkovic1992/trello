import React from 'react';
import { AddBtn } from '../../components';
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