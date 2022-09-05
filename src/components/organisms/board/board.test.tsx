import { render, waitFor } from 'utils/test-utils';

import userEvent from '@testing-library/user-event';

import store from 'store';
import { fetchBoardListsAndCards } from 'store/board-slice';

import { Board } from './board';

beforeEach(async () => {
  store.dispatch(fetchBoardListsAndCards('boardId1'));
  await waitFor(() => {
    const state = store.getState();
    expect(state.board.isLoading).toBeFalsy();
    expect(state.board.details.id).not.toBe('');
  });
});

describe('Board', () => {
  it('renders component', async () => {
    const { getByRole, queryByRole, queryByTestId } = render(
      <Board>
        <></>
      </Board>,
    );

    await waitFor(() => {
      expect(queryByRole('heading', { level: 1 })).toBeInTheDocument();
    });

    const boardElement = getByRole('board');
    expect(boardElement).toBeInTheDocument();

    const headerElement = getByRole('page-header');
    expect(headerElement).toBeInTheDocument();

    const homeButtonElement = getByRole('home-button');
    expect(homeButtonElement).toBeInTheDocument();

    const titleElement = getByRole('heading', { level: 1 });
    expect(titleElement).toBeInTheDocument();

    const inputElement = queryByTestId('board-title-input');
    expect(inputElement).not.toBeInTheDocument();

    const logoutButtonElement = getByRole('button', { name: /log out/i });
    expect(logoutButtonElement).toBeInTheDocument();
  });

  it('manipulates title on user interaction', async () => {
    const sampleTitle = 'new board name';
    const { getByRole, getByTestId, queryByRole, queryByTestId } = render(
      <Board>
        <></>
      </Board>,
    );

    await waitFor(() => {
      expect(queryByRole('heading', { level: 1 })).toBeInTheDocument();
    });

    const titleElement = getByRole('heading', { level: 1 });

    const inputElement = queryByTestId('board-title-input');
    expect(inputElement).not.toBeInTheDocument();

    userEvent.click(titleElement);
    const titleElementAfterClicking = queryByRole('heading', { level: 1 });
    expect(titleElementAfterClicking).not.toBeInTheDocument();

    const inputElementAfterClicking = getByTestId('board-title-input');
    expect(inputElementAfterClicking).toBeInTheDocument();

    userEvent.clear(inputElementAfterClicking);
    userEvent.tab();

    await waitFor(() => {
      const titleElementAfterEmptyInput = queryByRole('heading', { level: 1 });
      expect(titleElementAfterEmptyInput).toHaveTextContent('old board name');
    });

    const titleElementAfterEmptySubmit = getByRole('heading', { level: 1 });
    userEvent.click(titleElementAfterEmptySubmit);

    const inputElementAfterEmptySubmit = getByTestId('board-title-input');
    userEvent.clear(inputElementAfterEmptySubmit);
    userEvent.type(inputElementAfterEmptySubmit, sampleTitle);
    userEvent.tab();

    const state = store.getState();
    expect(state.boards.isLoading).toBe(true);

    await waitFor(() => {
      const titleElementAfterInput = queryByRole('heading', { level: 1 });
      expect(titleElementAfterInput).toHaveTextContent(sampleTitle);
      const state = store.getState();
      expect(state.boards.isLoading).toBe(false);
    });
  });
});
