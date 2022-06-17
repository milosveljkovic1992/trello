import React from 'react';
import { CardMove } from '../../components';
import { GrClose } from 'react-icons/gr';

export const CardMovePanel = ({ rect, card, setIsMoveOpen }) => {

    return (
        <CardMove 
            rect={rect} 
            position={rect.x + 300 > window.innerWidth ? 'right' : 'left'}
        >
            <CardMove.Title>Move card</CardMove.Title>
            <CardMove.Subtitle>Select destination</CardMove.Subtitle>
            <CardMove.OptionsContainer>
                <CardMove.DroplistContainer className="list-dropdown">
                    <CardMove.Label>List</CardMove.Label>
                    <CardMove.Dropdown>
                        <CardMove.Option>1</CardMove.Option>
                        <CardMove.Option>1</CardMove.Option>
                        <CardMove.Option>1</CardMove.Option>
                    </CardMove.Dropdown>
                </CardMove.DroplistContainer>

                <CardMove.DroplistContainer className="position-dropdown">
                    <CardMove.Label>Position</CardMove.Label>
                    <CardMove.Dropdown>
                        <CardMove.Option>2</CardMove.Option>
                        <CardMove.Option>2</CardMove.Option>
                        <CardMove.Option>2</CardMove.Option>
                    </CardMove.Dropdown>
                </CardMove.DroplistContainer>
            </CardMove.OptionsContainer>
            <CardMove.IconContainer onClick={() => setIsMoveOpen(false)}>
                <GrClose/>
            </CardMove.IconContainer>
        </CardMove>
    )
}


// Container
// Title
// Subtitle
// DroplistContainer
// Label
// Value
// Dropdown
// Option