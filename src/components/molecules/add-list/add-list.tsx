import { ChangeEvent, useState } from 'react';

import { useSelector } from 'react-redux';
import { AiOutlinePlus } from 'react-icons/ai';

import { RootState, useAppDispatch } from 'store';
import { finishCreatingNewList, startCreatingNewList } from 'store/board-slice';
import { submitList } from 'store/lists-slice';

import { AddButton } from 'components/atoms';
import { NewItem } from 'components/molecules';

import { Container } from './add-list.styles';

export const AddList = () => {
  const dispatch = useAppDispatch();
  const { isCreatingNewList } = useSelector((state: RootState) => state.board);
  const boardId = useSelector((state: RootState) => state.board.details.id);
  const lists = useSelector((state: RootState) => state.lists.listsArray);

  const [userInput, setUserInput] = useState('');

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput(e.target.value);
  };

  const handleClose = () => {
    dispatch(finishCreatingNewList());
  };

  const handleSubmit = () => {
    if (boardId) {
      if (userInput.trim().length > 0) {
        const pos: number =
          lists.length > 0 ? lists[lists.length - 1].pos + 5000 : 5000;
        dispatch(submitList({ userInput, boardId, pos }));
      }
      setUserInput('');
      handleClose();
    }
  };

  return (
    <Container>
      {!isCreatingNewList && (
        <AddButton
          onClick={() => dispatch(startCreatingNewList())}
          icon={<AiOutlinePlus />}
        >
          Add another list
        </AddButton>
      )}

      {isCreatingNewList && (
        <NewItem
          handleInput={handleInput}
          handleSubmit={handleSubmit}
          handleClose={handleClose}
          placeholder="Enter list title..."
        >
          Add list
        </NewItem>
      )}
    </Container>
  );
};
