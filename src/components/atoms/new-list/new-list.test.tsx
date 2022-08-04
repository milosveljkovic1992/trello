import { useState } from 'react';
import { render } from 'utils/test-utils';
import { NewList } from './new-list';

const NewListContainer = () => {
  const [isCreatingNewList, setIsCreatingNewList] = useState(true);
  const boardId = '123';

  return (
    <NewList setIsCreatingNewList={setIsCreatingNewList} boardId={boardId} />
  );
};

describe('NewList', () => {
  it('renders component', () => {
    const { getByTestId } = render(<NewListContainer />);

    const newItemElement = getByTestId('new-item');
    expect(newItemElement).toBeInTheDocument();
  });
});
