import { useRef } from 'react';

import { FaTrashAlt } from 'react-icons/fa';

import { useListTitle } from './useListTitle';
import { ListTitleProps } from './list-title.types';
import { Title } from './list-title.styles';

export const ListTitle = ({ list }: ListTitleProps) => {
  const titleRef = useRef<HTMLTextAreaElement>(null);

  const {
    listTitle,
    isInputActive,
    handleInput,
    handleEnter,
    handleFocus,
    handleSubmit,
    handleDelete,
  } = useListTitle({ titleRef, list });

  return (
    <Title isInputActive={isInputActive} role="list-title">
      <textarea
        ref={titleRef}
        value={listTitle}
        onClick={handleFocus}
        onChange={handleInput}
        onKeyDown={handleEnter}
        onBlur={handleSubmit}
      ></textarea>
      <div
        className="delete-btn"
        onClick={handleDelete}
        data-testid="delete-list"
      >
        <FaTrashAlt />
      </div>
    </Title>
  );
};
