import { ChangeEvent, useState } from 'react';

import { useSelector } from 'react-redux';

import { RootState, useAppDispatch } from 'store';
import { submitList } from 'store/lists-slice';

import { NewItem } from 'components/molecules';
import { NewListProps } from './new-list.types';

export const NewList = ({ setIsCreatingNewList, boardId }: NewListProps) => {
  const dispatch = useAppDispatch();
  const lists = useSelector((state: RootState) => state.lists.listsArray);
  const [userInput, setUserInput] = useState('');

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = () => {
    if (userInput.trim().length > 0) {
      const pos: number =
        lists.length > 0 ? lists[lists.length - 1].pos + 5000 : 5000;
      dispatch(submitList({ userInput, boardId, pos }));
    }
    setUserInput('');
    setIsCreatingNewList(false);
  };

  return (
    <NewItem
      handleInput={handleInput}
      handleSubmit={handleSubmit}
      setIsCreatingNew={setIsCreatingNewList}
      placeholder="Enter list title..."
    >
      Add list
    </NewItem>
  );
};
