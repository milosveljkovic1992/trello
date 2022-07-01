import React from 'react';
import { Title } from 'components/atoms/list-title/list-title-styles';

export const ListTitle = React.forwardRef(({ isInputActive, listTitle, setListTitle, handleFocus, handleBlur,handleSendToArchive, icon }, ref) => {
    return (
        <Title isInputActive={isInputActive}>
            <textarea 
                ref={ref} 
                onDrop={() => false}
                value={listTitle} 
                onClick={handleFocus} 
                onChange={e => setListTitle(e.target.value)}
                onBlur={handleBlur}
            ></textarea>
            <div className="delete-btn" onClick={handleSendToArchive}>
                {icon}
            </div>
        </Title>
    ) 
});