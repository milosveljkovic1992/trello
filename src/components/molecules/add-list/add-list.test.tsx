import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { render, screen, waitFor } from 'utils/test-utils';

import store from 'store';
import { fetchBoardListsAndCards, resetBoard } from 'store/board-slice';
import { setListsArray } from 'store/lists-slice';

import { AddList } from './add-list';

beforeAll(async () => {
  await store.dispatch(fetchBoardListsAndCards('222'));
});

describe('AddList', () => {
  it('renders button on initial render', () => {
    render(<AddList />);

    const addButtonElement = screen.getByRole('button', {
      name: 'Add another list',
    });
    expect(addButtonElement).toBeInTheDocument();
    userEvent.click(addButtonElement);

    const newListElement = screen.getByTestId('new-item');
    expect(addButtonElement).not.toBeInTheDocument();
    expect(newListElement).toBeInTheDocument();
  });

  it('manipulates input on user events', async () => {
    const sampleTitle = 'To doooo';
    render(<AddList />);

    const addButtonElement = screen.getByRole('button', {
      name: 'Add another list',
    });
    userEvent.click(addButtonElement);

    const closeButton = screen.getByTestId('close-button');
    const submitButton = screen.getByRole('button', {
      name: 'Add list',
    });
    const inputElement = screen.getByRole('textbox');

    expect(closeButton).toBeInTheDocument();
    expect(submitButton).toBeInTheDocument();
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('placeholder', 'Enter list title...');
    expect(inputElement).toHaveFocus();

    userEvent.clear(inputElement);
    userEvent.click(submitButton);

    const addButtonAfterEmptySubmit = screen.getByRole('button', {
      name: 'Add another list',
    });
    userEvent.click(addButtonAfterEmptySubmit);

    const submitButtonAfterEmptySubmit = screen.getByRole('button', {
      name: 'Add list',
    });
    const inputElementAfterEmptySubmit = screen.getByRole('textbox');

    userEvent.type(inputElementAfterEmptySubmit, sampleTitle);
    expect(inputElementAfterEmptySubmit).toHaveValue(sampleTitle);
    userEvent.click(submitButtonAfterEmptySubmit);

    await waitFor(() => {
      const state = store.getState();
      const lists = state.lists.listsArray;
      expect(lists).toHaveLength(4);
    });

    const closeButtonAfterSubmit = screen.queryByTestId('close-button');
    const submitButtonAfterSubmit = screen.queryByRole('button', {
      name: 'Add list',
    });
    const inputElementAfterSubmit = screen.queryByRole('textbox');

    expect(closeButtonAfterSubmit).not.toBeInTheDocument();
    expect(submitButtonAfterSubmit).not.toBeInTheDocument();
    expect(inputElementAfterSubmit).not.toBeInTheDocument();

    act(() => {
      store.dispatch(setListsArray([]));
      const state = store.getState();
      const lists = state.lists.listsArray;
      expect(lists).toHaveLength(0);
    });

    const addButtonAfterClearingListsArray = screen.getByRole('button', {
      name: 'Add another list',
    });
    userEvent.click(addButtonAfterClearingListsArray);
    userEvent.type(screen.getByRole('textbox'), sampleTitle);
    const submitButtonAfterClearingListsArray = screen.getByRole('button', {
      name: 'Add list',
    });
    userEvent.click(submitButtonAfterClearingListsArray);

    await waitFor(() => {
      const state = store.getState();
      const lists = state.lists.listsArray;
      expect(lists).toHaveLength(1);
      expect(lists[0].pos).toBe(5000);
    });

    act(() => {
      store.dispatch(resetBoard());
    });

    const addButtonAfterSubmit = screen.getByRole('button', {
      name: 'Add another list',
    });
    expect(addButtonAfterSubmit).toBeInTheDocument();
    userEvent.click(addButtonAfterSubmit);

    const inputElementOnEmptyBoard = screen.getByRole('textbox');
    const submitButtonOnEmptyBoard = screen.getByRole('button', {
      name: 'Add list',
    });
    userEvent.type(inputElementOnEmptyBoard, sampleTitle);
    userEvent.click(submitButtonOnEmptyBoard);

    const addButtonOnEmptyBoard = screen.getByRole('button', {
      name: 'Add another list',
    });
    expect(addButtonOnEmptyBoard).toBeInTheDocument();

    await waitFor(() => {
      const state = store.getState();
      const lists = state.lists.listsArray;
      expect(lists).not.toHaveLength(5);
    });
  });
});
