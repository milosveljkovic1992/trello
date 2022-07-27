import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { submitList } from 'store/lists-slice';

export const useNewList = ({ setCreatingNewList, boardId }) => {
  const dispatch = useDispatch();
  const lists = useSelector((state) => state.lists.listsArray);
  const [userInput, setUserInput] = useState('');

  const handleInput = (e) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = () => {
    if (userInput.trim().length > 0) {
      const pos = lists.length > 0 ? lists[lists.length - 1].pos + 5000 : 5000;
      dispatch(submitList({ userInput, boardId, pos }));
    }
    setUserInput('');
    setCreatingNewList(false);
  };

  return { handleInput, handleSubmit };
};
