import { useState } from 'react';
import userEvent from '@testing-library/user-event';

import { render } from 'utils/test-utils';
import { ListTitle } from './list-title';

const ListTitleContainer = () => {
  const [listTitle, setListTitle] = useState('list title');
  const oldTitle = 'old title';
  const listId = '123';

  return (
    <ListTitle
      oldTitle={oldTitle}
      listId={listId}
      listTitle={listTitle}
      setListTitle={setListTitle}
    />
  );
};

describe('ListTitle component', () => {
  it('renders title', () => {
    const { getByRole } = render(<ListTitleContainer />);

    const inputElement = getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
  });

  it('renders delete icon', () => {
    const { getByTestId } = render(<ListTitleContainer />);

    const buttonElement = getByTestId('delete-list');
    expect(buttonElement).toBeInTheDocument();
  });

  it('changes on input on user clicking away', () => {
    const sampleTitle = 'some title';
    const { getByRole } = render(<ListTitleContainer />);

    const inputElement = getByRole('textbox');
    const listTitleContainer = getByRole('list-title');

    userEvent.type(inputElement, sampleTitle);
    userEvent.click(listTitleContainer);

    expect(inputElement.textContent).toBe(sampleTitle);
  });
});
