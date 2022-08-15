import { useState } from 'react';
import { render } from 'utils/test-utils';
import { NewCard } from './new-card';

const NewCardContainer = () => {
  const [isCreatingNew, setIsCreatingNew] = useState(true);
  const listId = '123';

  return <NewCard setIsCreatingNew={setIsCreatingNew} listId={listId} />;
};

describe('NewCard', () => {
  it('renders component', () => {
    const { getByTestId } = render(<NewCardContainer />);

    const newItemElement = getByTestId('new-item');
    expect(newItemElement).toBeInTheDocument();
  });
});
