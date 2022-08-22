import { ChangeEvent, useState } from 'react';
import { useSelector } from 'react-redux';
import { AiOutlinePlus } from 'react-icons/ai';

import { RootState, useAppDispatch } from 'store';
import {
  finishCreatingNewCard,
  startCreatingNewCard,
  submitCard,
} from 'store/cards-slice';

import { AddButton } from 'components/atoms';
import { NewItem } from 'components/molecules';

export const AddCard = ({ listId }: { listId: string }) => {
  const dispatch = useAppDispatch();
  const { activeLists } = useSelector((state: RootState) => state.cards);
  const [userInput, setUserInput] = useState('');

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput(e.target.value);
  };

  const handleClose = () => {
    dispatch(finishCreatingNewCard(listId));
  };

  const handleSubmit = () => {
    if (userInput.trim().length > 0) {
      dispatch(submitCard({ listId, userInput }));
    }
    setUserInput('');
    handleClose();
  };

  return (
    <>
      {!activeLists[listId] && (
        <AddButton
          onClick={() => dispatch(startCreatingNewCard(listId))}
          icon={<AiOutlinePlus />}
        >
          Add a card
        </AddButton>
      )}
      {activeLists[listId] && (
        <NewItem
          handleInput={handleInput}
          handleSubmit={handleSubmit}
          handleClose={handleClose}
          placeholder="Enter a title for this card..."
        >
          Add Card
        </NewItem>
      )}
    </>
  );
};