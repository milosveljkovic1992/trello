import React, { useEffect } from "react"; 
import { NewCard } from "../components";
import { AiOutlineClose } from "react-icons/ai";

export const NewItem = ( {children, handleInput, handleSubmit, setIsCreatingNew, placeholder} ) => {

    const inputRef = React.useRef()

    useEffect(() => {
       inputRef.current.focus();
    }, []);

    return (
        <NewCard>
            <NewCard.InputContainer>
                <NewCard.InputBox ref={inputRef} placeholder={placeholder} onChange={handleInput}></NewCard.InputBox>
            </NewCard.InputContainer>
            <NewCard.ButtonContainer>
                <NewCard.Button onClick={handleSubmit}>{children}</NewCard.Button>
                <NewCard.IconContainer onClick={() => setIsCreatingNew(false)}>
                    <AiOutlineClose/>
                </NewCard.IconContainer>
            </NewCard.ButtonContainer>
        </NewCard>
    )
};