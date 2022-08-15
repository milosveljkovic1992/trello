import { useState, ChangeEvent } from 'react';
import userEvent from '@testing-library/user-event';
import { render } from 'utils/test-utils';

import { useAppDispatch } from 'store';
import { submitCard } from 'store/cards-slice';
import { NewItem } from './new-item';

const NewItemContainer = () => {
  const listId = '123';
  const dispatch = useAppDispatch();
  const [isCreatingNew, setIsCreatingNew] = useState(true);
  const [userInput, setUserInput] = useState('');

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setUserInput(e.target.value);
  };

  const handleSubmit = () => {
    if (userInput.trim().length > 0) {
      dispatch(submitCard({ listId, userInput }));
    }
    setUserInput('');
    setIsCreatingNew(false);
  };

  return (
    <NewItem
      handleInput={handleInput}
      handleSubmit={handleSubmit}
      setIsCreatingNew={setIsCreatingNew}
      placeholder="Create new card"
    >
      New Card
    </NewItem>
  );
};

describe('NewItem', () => {
  it('renders component', () => {
    const { getByTestId } = render(<NewItemContainer />);

    const newItemElement = getByTestId('new-item');
    expect(newItemElement).toBeInTheDocument();
  });

  it('sets item name on button click', () => {
    const sampleText = 'some text';
    const { getByRole } = render(<NewItemContainer />);

    const inputElement = getByRole('textbox');
    expect(inputElement).toBeInTheDocument();

    const buttonElement = getByRole('button', { name: 'New Card' });
    expect(buttonElement).toBeInTheDocument();

    userEvent.type(inputElement, sampleText);

    userEvent.click(buttonElement);
    const updatedInputElement = getByRole('textbox');
    expect(updatedInputElement.textContent).toBe('');
  });
});