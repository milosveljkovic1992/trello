import userEvent from '@testing-library/user-event';

import { render } from 'utils/test-utils';
import { ListTitle } from './list-title';

const list = {
  id: '123',
  name: 'abc',
  pos: 5000,
  idBoard: 'board123',
};

describe('ListTitle component', () => {
  it('renders title', () => {
    const { getByRole } = render(<ListTitle list={list} />);

    const inputElement = getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
  });

  it('renders delete icon', () => {
    const { getByTestId } = render(<ListTitle list={list} />);

    const buttonElement = getByTestId('delete-list');
    expect(buttonElement).toBeInTheDocument();
  });

  it('changes on input on user clicking away', () => {
    const sampleTitle = 'some title';
    const { getByRole } = render(<ListTitle list={list} />);

    const inputElement = getByRole('textbox');
    const listTitleContainer = getByRole('list-title');

    userEvent.type(inputElement, sampleTitle);
    userEvent.click(listTitleContainer);

    expect(inputElement.textContent).toBe(sampleTitle);
  });
});
