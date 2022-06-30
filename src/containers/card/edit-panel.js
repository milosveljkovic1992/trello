import React, { useEffect, useState } from 'react';
import { CgCreditCard } from 'react-icons/cg';
import { ImArrowRight2, ImCross } from 'react-icons/im';

import { CardEdit } from '../../atoms';
import { CardMovePanel } from './card-move-panel';

export const EditPanel = ({ rect, card, title, setTitle, handleOpen, handleRename, handleMove, handleDelete, isEditOpen, setIsEditOpen, isMoveOpen, setIsMoveOpen }) => {
    const [isLoading, setIsLoading] = useState(true);
    const [tabRect, setTabRect] = useState(null);

    const titleRef = React.useRef();
    const animationRef = React.useRef();
    const moveRef = React.useRef();

    const handleDisplay = (e) => {
        if (e.target.classList.contains('card-edit__overlay')) {
            isMoveOpen ? setIsMoveOpen(false) : setIsEditOpen(false);
        }
    };

    useEffect(() => {
        if (!isLoading) {
            titleRef.current.select();
            animationRef.current.classList.add('card-edit');
        }
        setIsLoading(false);
    }, [isLoading, rect]);

    useEffect(() => {
        if (!isLoading && isMoveOpen) {
            setTabRect(moveRef.current.getBoundingClientRect());
        }
    }, [isLoading, isMoveOpen]);


    if (isLoading) {
        return <></>
    }

    return (
        <CardEdit 
            className="card-edit__overlay" 
            onClick={handleDisplay}
        >
            <CardEdit.Container rect={rect}>
                <CardEdit.InputBox 
                    ref={titleRef} 
                    value={title} 
                    onChange={e => setTitle(e.target.value)}
                ></CardEdit.InputBox>
                <CardEdit.OptionsContainer 
                    ref={animationRef} 
                    direction={ rect.x + rect.width + 120 > window.innerWidth ? 'right' : 'left' }
                >

                    <CardEdit.Tab onClick={() => handleOpen(card)}>
                        <CardEdit.IconContainer>
                            <CgCreditCard />
                        </CardEdit.IconContainer>
                        <CardEdit.Label>Open card</CardEdit.Label>
                    </CardEdit.Tab>

                    <CardEdit.Tab 
                        ref={moveRef}
                        className="card-edit__move-button" 
                        onClick={() => setIsMoveOpen(!isMoveOpen)}
                    >
                        <CardEdit.IconContainer>
                            <ImArrowRight2 />
                        </CardEdit.IconContainer>
                        <CardEdit.Label>Move</CardEdit.Label>
                    </CardEdit.Tab>
                    
                    <CardEdit.Tab onClick={() => handleDelete(card)}>
                        <CardEdit.IconContainer>
                            <ImCross />
                        </CardEdit.IconContainer>
                        <CardEdit.Label>Delete</CardEdit.Label>
                    </CardEdit.Tab>

                </CardEdit.OptionsContainer>

                <CardEdit.Button onClick={() => handleRename(card, title)}>Save</CardEdit.Button>

                { isMoveOpen && tabRect && <CardMovePanel rect={tabRect} card={card} setIsMoveOpen={setIsMoveOpen} handleMove={handleMove} /> }
            </CardEdit.Container>
        </CardEdit>
    )
};