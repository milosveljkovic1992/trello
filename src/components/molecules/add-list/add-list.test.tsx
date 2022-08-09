import userEvent from '@testing-library/user-event';
import { useState } from 'react';
import { render } from 'utils/test-utils';
import { AddList } from './add-list';

const AddListContainer = () => {
  const [isCreatingNewList, setIsCreatingNewList] = useState(false);
  const boardId = '123';

  return (
    <AddList
      isCreatingNewList={isCreatingNewList}
      setIsCreatingNewList={setIsCreatingNewList}
      boardId={boardId}
    />
  );
};

describe('AddList', () => {
  it('renders button on initial render', () => {
    const { getByRole } = render(<AddListContainer />);

    const addButtonElement = getByRole('button', { name: 'Add another list' });
    expect(addButtonElement).toBeInTheDocument();
  });

  it('renders NewList on button click', () => {
    const { getByRole, getByTestId } = render(<AddListContainer />);

    const addButtonElement = getByRole('button', { name: 'Add another list' });
    expect(addButtonElement).toBeInTheDocument();
    userEvent.click(addButtonElement);

    const newListElement = getByTestId('new-item');
    expect(addButtonElement).not.toBeInTheDocument();
    expect(newListElement).toBeInTheDocument();
  });
});
