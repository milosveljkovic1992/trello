import userEvent from '@testing-library/user-event';

import { render } from 'utils/test-utils';

import { AddCard } from './add-card';

describe('AddCard', () => {
  it('should render component', () => {
    const { getByRole } = render(<AddCard listId="123" />);

    const addButton = getByRole('button', { name: 'Add a card' });
    expect(addButton).toBeInTheDocument();
  });

  it('should render input on user click', () => {
    const sampleText = 'card title';
    const { getByRole, getByPlaceholderText, getByTestId, getByText } = render(
      <AddCard listId="123" />,
    );

    const addButton = getByRole('button', { name: 'Add a card' });
    userEvent.click(addButton);

    expect(addButton).not.toBeInTheDocument();

    const inputContainer = getByTestId('new-item');
    expect(inputContainer).toBeInTheDocument();

    const inputElement = getByPlaceholderText(
      /Enter a title for this card.../i,
    );
    expect(inputElement).toBeInTheDocument();

    const closeButtonElement = getByTestId('close-button');
    expect(closeButtonElement).toBeInTheDocument();

    const submitButtonElement = getByRole('button', { name: 'Add Card' });
    expect(submitButtonElement).toBeInTheDocument();

    userEvent.type(inputElement, sampleText);
    expect(getByText(sampleText)).toBeInTheDocument();
  });

  it('closes input on "Add Card" button click', async () => {
    const sampleText = 'card title';
    const { getByRole, getByPlaceholderText } = render(
      <AddCard listId="123" />,
    );

    const inputElement = getByPlaceholderText(
      /Enter a title for this card.../i,
    );
    userEvent.type(inputElement, sampleText);

    const submitButtonElement = getByRole('button', { name: 'Add Card' });
    userEvent.click(submitButtonElement);
    expect(submitButtonElement).not.toBeInTheDocument();

    const addButton = getByRole('button', { name: 'Add a card' });
    expect(addButton).toBeInTheDocument();
    userEvent.click(addButton);

    const submitButtonElement2 = getByRole('button', { name: 'Add Card' });
    userEvent.click(submitButtonElement2);

    expect(submitButtonElement2).not.toBeInTheDocument();
  });

  it('closes input on Cancel button click', async () => {
    const { getByRole, getByTestId } = render(<AddCard listId="123" />);

    const addButton = getByRole('button', { name: 'Add a card' });
    userEvent.click(addButton);

    expect(addButton).not.toBeInTheDocument();

    const closeButtonElement = getByTestId('close-button');
    expect(closeButtonElement).toBeInTheDocument();

    userEvent.click(closeButtonElement);

    expect(closeButtonElement).not.toBeInTheDocument();

    const addButton2 = getByRole('button', { name: 'Add a card' });
    expect(addButton2).toBeInTheDocument();
  });
});
