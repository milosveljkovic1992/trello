import userEvent from '@testing-library/user-event';
import store from 'store';
import { fetchBoardListsAndCards } from 'store/board-slice';

import { render, waitFor } from 'utils/test-utils';

import { AddCard } from './add-card';

beforeAll(async () => {
  store.dispatch(fetchBoardListsAndCards('boardId1'));
  await waitFor(() => {
    const state = store.getState();
    expect(state.board.isLoading).toBeFalsy();
    expect(state.board.details.id).not.toBe('');
  });
});

describe('AddCard', () => {
  it('should render component and manipulates input on user interactions', async () => {
    const initialCardArrayLength = store.getState().cards.cardsArray.length;
    const sampleTitle = 'card title';
    const { getByRole, getByPlaceholderText, getByTestId } = render(
      <AddCard listId="listId1" />,
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
    expect(inputElement).toHaveTextContent('');

    const closeButton = getByTestId('close-button');
    expect(closeButton).toBeInTheDocument();

    const submitButton = getByRole('button', { name: 'Add Card' });
    expect(submitButton).toBeInTheDocument();

    userEvent.type(inputElement, sampleTitle);
    userEvent.click(submitButton);

    await waitFor(() => {
      const state = store.getState();
      expect(state.cards.cardsArray.length).toBeGreaterThan(
        initialCardArrayLength,
      );
      expect(state.cards.cardsArray.some((card) => card.name === sampleTitle));
    });

    expect(submitButton).not.toBeInTheDocument();

    const addButtonAfterSubmit = getByRole('button', { name: 'Add a card' });
    expect(addButtonAfterSubmit).toBeInTheDocument();
  });

  it('closes input on empty input submit or Cancel button click', async () => {
    const initialCardArrayLength = store.getState().cards.cardsArray.length;
    const { getByRole, getByTestId } = render(<AddCard listId="listId1" />);

    const addButton = getByRole('button', { name: 'Add a card' });
    userEvent.click(addButton);

    const submitButton = getByRole('button', { name: 'Add Card' });
    userEvent.click(submitButton);

    expect(submitButton).not.toBeInTheDocument();
    expect(store.getState().cards.cardsArray).toHaveLength(
      initialCardArrayLength,
    );

    const addButtonAfterEmptySubmit = getByRole('button', {
      name: 'Add a card',
    });
    userEvent.click(addButtonAfterEmptySubmit);

    const closeButton = getByTestId('close-button');
    userEvent.click(closeButton);

    expect(closeButton).not.toBeInTheDocument();

    const addButtonAfterClose = getByRole('button', { name: 'Add a card' });
    expect(addButtonAfterClose).toBeInTheDocument();
  });
});
