import userEvent from '@testing-library/user-event';
import { render } from 'utils/test-utils';
import { AddList } from './add-list';

describe('AddList', () => {
  it('renders button on initial render', () => {
    const { getByRole } = render(<AddList />);

    const addButtonElement = getByRole('button', { name: 'Add another list' });
    expect(addButtonElement).toBeInTheDocument();
  });

  it('renders NewList on button click', () => {
    const { getByRole, getByTestId } = render(<AddList />);

    const addButtonElement = getByRole('button', { name: 'Add another list' });
    expect(addButtonElement).toBeInTheDocument();
    userEvent.click(addButtonElement);

    const newListElement = getByTestId('new-item');
    expect(addButtonElement).not.toBeInTheDocument();
    expect(newListElement).toBeInTheDocument();
  });
});
