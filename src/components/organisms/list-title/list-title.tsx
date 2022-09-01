import { useRef } from 'react';

import { FaTrashAlt } from 'react-icons/fa';

import { useAppDispatch } from 'store';
import { archiveList } from 'store/lists-slice';

import { useListTitle } from './useListTitle';
import { ListTitleProps } from './list-title.types';
import { Title } from './list-title.styles';

export const ListTitle = ({ list }: ListTitleProps) => {
  const dispatch = useAppDispatch();
  const titleRef = useRef<HTMLTextAreaElement>(null);

  const { isInputActive, handleFocus, handleSubmit, listTitle, setListTitle } =
    useListTitle({ titleRef, list });

  return (
    <Title isInputActive={isInputActive} role="list-title">
      <textarea
        ref={titleRef}
        value={listTitle}
        onClick={handleFocus}
        onChange={(e) => setListTitle(e.target.value)}
        onBlur={handleSubmit}
      ></textarea>
      <div
        className="delete-btn"
        onClick={() => dispatch(archiveList(list.id))}
        data-testid="delete-list"
      >
        <FaTrashAlt />
      </div>
    </Title>
  );
};
