import { act, render, waitFor } from 'utils/test-utils';
import { render as defaultRender } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';

import store from 'store';
import { login } from 'store/auth-slice';
import { fetchBoardListsAndCards } from 'store/board-slice';

import { Header } from './header';

beforeAll(() => {
  store.dispatch(login('123223323'));
});

describe('Header', () => {
  it('renders only "Log out" button on Home page', async () => {
    const { getByRole, queryByRole } = render(<Header isHomePage={true} />);

    const headerElement = getByRole('page-header');
    expect(headerElement).toBeInTheDocument();

    const homeButtonElement = queryByRole('home-button');
    expect(homeButtonElement).not.toBeInTheDocument();

    const logoutButtonElement = getByRole('button', { name: /log out/i });
    expect(logoutButtonElement).toBeInTheDocument();
  });

  it('renders all elements on board page and handles title', async () => {
    const state = store.getState();
    expect(state.board.isLoading).toBeTruthy();
    expect(state.auth.isAuth).toBeTruthy();

    const sampleTitle = 'new board name';

    const { getByRole, getByTestId, queryByRole, queryByTestId } =
      defaultRender(
        <MemoryRouter initialEntries={['/', '/b/boardId1']}>
          <Provider store={store}>
            <Routes>
              <Route
                path="/b/boardId1"
                element={<Header isHomePage={false} />}
              />
              <Route path="/" element={<Header isHomePage={true} />} />
            </Routes>
          </Provider>
        </MemoryRouter>,
      );

    act(() => {
      store.dispatch(fetchBoardListsAndCards('boardId1'));
    });

    await waitFor(() => {
      const state = store.getState();
      expect(state.board.isLoading).toBeFalsy();
    });

    const homeButton = getByRole('home-button');
    expect(homeButton).toBeInTheDocument();

    const logoutButtonElement = getByRole('button', { name: /log out/i });
    expect(logoutButtonElement).toBeInTheDocument();

    const boardTitle = getByRole('heading', { level: 1 });
    expect(boardTitle).toHaveTextContent('old board name');

    userEvent.click(boardTitle);
    const boardTitleAfterClick = queryByRole('heading', { level: 1 });
    expect(boardTitleAfterClick).not.toBeInTheDocument();

    const boardTitleInput = getByTestId('board-title-input');
    expect(boardTitleInput).toBeInTheDocument();

    userEvent.clear(boardTitleInput);
    userEvent.tab();

    await waitFor(() => {
      const titleElementAfterEmptyInput = queryByRole('heading', { level: 1 });
      expect(titleElementAfterEmptyInput).toHaveTextContent('old board name');
    });

    userEvent.click(getByRole('heading', { level: 1 }));
    const boardTitleInputAfterEmptySubmit = getByTestId('board-title-input');
    expect(boardTitleInputAfterEmptySubmit).toBeInTheDocument();

    userEvent.clear(boardTitleInputAfterEmptySubmit);
    userEvent.type(boardTitleInputAfterEmptySubmit, sampleTitle);
    userEvent.tab();

    expect(store.getState().boards.isLoading).toBeTruthy();

    await waitFor(() => {
      const state = store.getState();
      const boardTitleInputAfterSubmit = queryByTestId('board-title-input');
      expect(boardTitleInputAfterSubmit).not.toBeInTheDocument();

      const boardTitleAfterSubmit = getByRole('heading', { level: 1 });
      expect(boardTitleAfterSubmit).toBeInTheDocument();

      expect(state.boards.isLoading).toBeFalsy();
      expect(state.board.details.name).toBe(sampleTitle);
    });

    userEvent.click(homeButton);
    expect(window.location.pathname).toBe('/');

    const boardTitleAfterSubmit = queryByRole('heading', { level: 1 });
    expect(boardTitleAfterSubmit).not.toBeInTheDocument();

    userEvent.click(logoutButtonElement);
    expect(store.getState().auth.isAuth).toBeFalsy();
  });
});
