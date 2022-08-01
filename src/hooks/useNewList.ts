import { ChangeEvent, useState } from 'react';

import { useSelector } from 'react-redux';

import { submitList } from 'store/lists-slice';
import { NewListProps } from 'components/atoms/new-list/new-list.types';
import { RootState, useAppDispatch } from 'store';

export const useNewList = ({ setIsCreatingNewList, boardId }: NewListProps) => {
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

  return { handleInput, handleSubmit };
};
