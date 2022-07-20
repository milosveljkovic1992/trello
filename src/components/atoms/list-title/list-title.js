import { forwardRef } from 'react';
import { Title } from './list-title-styles';

// eslint-disable-next-line react/display-name
export const ListTitle = forwardRef(
  (
    {
      isInputActive,
      listTitle,
      setListTitle,
      handleFocus,
      handleBlur,
      handleSendToArchive,
      icon,
    },
    ref,
  ) => {
    return (
      <Title isInputActive={isInputActive}>
        <textarea
          ref={ref}
          onDrop={() => false}
          value={listTitle}
          onClick={handleFocus}
          onChange={(e) => setListTitle(e.target.value)}
          onBlur={handleBlur}
        ></textarea>
        <div className="delete-btn" onClick={handleSendToArchive}>
          {icon}
        </div>
      </Title>
    );
  },
);
