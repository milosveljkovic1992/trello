import React, { useRef, useState } from "react";
import { BoardList } from "../../components";

export const ListHeading = ({ title }) => {
    const [boardTitle, setBoardTitle] = useState(title);

    const titleRef = useRef(null);

    const handleFocus = () => {
        titleRef.current.select();
    }

    return (
        <BoardList.Heading>
            <BoardList.Title 
                ref={titleRef} 
                value={boardTitle} 
                onClick={handleFocus} 
                onChange={e => setBoardTitle(e.target.value)}
            />
        </BoardList.Heading>
    )
};