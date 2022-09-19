import { ChangeEvent, KeyboardEvent, useState } from 'react';

import { useSelector } from 'react-redux';
import { AiOutlinePlus } from 'react-icons/ai';

import { RootState, useAppDispatch } from 'store';
import { submitList } from 'store/lists-slice';

import { ButtonWithIcon } from 'components/atoms';
import { NewItem } from 'components/molecules';

import { Container } from './add-list.styles';

export const AddList = () => {
  const dispatch = useAppDispatch();
  const boardId = useSelector((state: RootState) => state.board.details.id);
  const lists = useSelector((state: RootState) => state.lists.listsArray);

  const [userInput, setUserInput] = useState('');
  const [isCreatingNewList, setIsCreatingNewList] = useState(false);

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput(e.target.value);
  };

  const handleEnter = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.code === 'Enter') {
      handleSubmit();
    }
  };

  const handleClose = () => {
    setUserInput('');
    setIsCreatingNewList(false);
  };

  const handleSubmit = () => {
    if (boardId) {
      if (userInput.trim().length > 0) {
        const pos: number =
          lists.length > 0 ? lists[lists.length - 1].pos + 5000 : 5000;
        dispatch(submitList({ userInput, boardId, pos }));
      }
    }
    handleClose();
  };

  return (
    <Container>
      {!isCreatingNewList && (
        <ButtonWithIcon
          onClick={() => setIsCreatingNewList(true)}
          icon={<AiOutlinePlus />}
        >
          Add another list
        </ButtonWithIcon>
      )}

      {isCreatingNewList && (
        <NewItem
          handleInput={handleInput}
          handleEnter={handleEnter}
          handleSubmit={handleSubmit}
          handleClose={handleClose}
          placeholder="Enter list title..."
          input={userInput}
        >
          Add list
        </NewItem>
      )}
    </Container>
  );
};
