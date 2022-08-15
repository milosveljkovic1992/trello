import { useState, useRef } from 'react';

import axios from 'axios';
import { FaTrashAlt } from 'react-icons/fa';

import { useAppDispatch } from 'store';
import { archiveList } from 'store/lists-slice';
import { throwError } from 'store/error-slice';

import { ListTitleProps } from './list-title.types';
import { Title } from './list-title.styles';

export const ListTitle = ({
  oldTitle,
  listId,
  listTitle,
  setListTitle,
}: ListTitleProps) => {
  const dispatch = useAppDispatch();
  const [isInputActive, setIsInputActive] = useState(false);

  const titleRef = useRef<HTMLTextAreaElement>(null);

  const submitTitle = async () => {
    try {
      await axios.put(`/1/lists/${listId}?name=${listTitle}`);
    } catch (error) {
      setListTitle(oldTitle);
      dispatch(throwError('Could not update title'));
    }
  };

  const handleFocus = () => {
    setIsInputActive(true);
    titleRef.current?.select();
  };

  const handleBlur = () => {
    submitTitle();
    setIsInputActive(false);
  };

  return (
    <Title isInputActive={isInputActive} role="list-title">
      <textarea
        ref={titleRef}
        onDrop={() => false}
        value={listTitle}
        onClick={handleFocus}
        onChange={(e) => setListTitle(e.target.value)}
        onBlur={handleBlur}
      ></textarea>
      <div
        className="delete-btn"
        onClick={() => dispatch(archiveList(listId))}
        data-testid="delete-list"
      >
        <FaTrashAlt />
      </div>
    </Title>
  );
};
