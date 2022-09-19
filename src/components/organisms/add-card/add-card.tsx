import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { AiOutlinePlus } from 'react-icons/ai';

import { RootState, useAppDispatch } from 'store';
import {
  finishCreatingNewCard,
  startCreatingNewCard,
  submitCard,
} from 'store/cards-slice';

import { ButtonWithIcon } from 'components/atoms';
import { NewItem } from 'components/molecules';

export const AddCard = ({ listId }: { listId: string }) => {
  const dispatch = useAppDispatch();
  const { activeLists } = useSelector((state: RootState) => state.cards);
  const [userInput, setUserInput] = useState('');

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
    dispatch(finishCreatingNewCard(listId));
  };

  const handleSubmit = () => {
    if (userInput.trim().length > 0) {
      dispatch(submitCard({ listId, userInput }));
    }
    handleClose();
  };

  return (
    <>
      {!activeLists[listId] && (
        <ButtonWithIcon
          onClick={() => dispatch(startCreatingNewCard(listId))}
          icon={<AiOutlinePlus />}
        >
          Add a card
        </ButtonWithIcon>
      )}
      {activeLists[listId] && (
        <NewItem
          handleInput={handleInput}
          handleEnter={handleEnter}
          handleSubmit={handleSubmit}
          handleClose={handleClose}
          placeholder="Enter a title for this card..."
          input={userInput}
        >
          Add Card
        </NewItem>
      )}
    </>
  );
};
