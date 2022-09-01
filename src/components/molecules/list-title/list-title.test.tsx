import userEvent from '@testing-library/user-event';
import { render, waitFor } from 'utils/test-utils';

import store from 'store';
import { fetchBoardListsAndCards } from 'store/board-slice';

import { ListTitle } from './list-title';

beforeAll(async () => {
  expect(store.getState().lists.listsArray).toHaveLength(0);

  store.dispatch(fetchBoardListsAndCards('boardId1'));
  await waitFor(() => {
    expect(store.getState().lists.listsArray.length).toBeGreaterThan(0);
  });
});

describe('ListTitle component', () => {
  it('renders title and sends rename request on user interaction', async () => {
    const sampleTitle = 'some title';
    const testList = store.getState().lists.listsArray[0];
    const { getByRole, getByTestId } = render(<ListTitle list={testList} />);

    const listTitleElement = getByRole('list-title');
    expect(listTitleElement).toBeInTheDocument();

    const inputElement = getByRole('textbox');
    expect(inputElement).toBeInTheDocument();

    const deleteButton = getByTestId('delete-list');
    expect(deleteButton).toBeInTheDocument();

    userEvent.click(inputElement);
    expect(deleteButton).toHaveStyle({ display: 'none' });

    userEvent.clear(inputElement);
    userEvent.type(inputElement, sampleTitle);

    userEvent.tab();

    await waitFor(() => {
      const state = store.getState();
      expect(state.lists.listsArray[0].id === testList.id);
      expect(state.lists.listsArray[0].name === sampleTitle);
    });

    expect(inputElement.textContent).toBe(sampleTitle);
  });

  it('deletes list on delete button click', async () => {
    const state = store.getState();
    const lists = state.lists.listsArray;
    const initialListsLength = lists.length;
    const testList = store.getState().lists.listsArray[0];

    const { getByTestId } = render(<ListTitle list={testList} />);

    const deleteButton = getByTestId('delete-list');
    userEvent.click(deleteButton);

    await waitFor(() => {
      const state = store.getState();
      expect(state.lists.listsArray).not.toHaveLength(initialListsLength);
      expect(state.lists.listsArray).toHaveLength(initialListsLength - 1);
    });
  });
});
