import { Route, Routes } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import { useSelector } from 'react-redux';
import {
  act,
  getByLabelText,
  getByTestId,
  render,
  waitFor,
} from 'utils/test-utils';

import store, { RootState } from 'store';
import { login, logout } from 'store/auth-slice';
import { setBoards } from 'store/boards-slice';
import { resetError } from 'store/error-slice';
import { getMemberInfo } from 'store/member-slice';

import { BoardPage } from 'components/pages';
import { CardPopup } from 'components/pages';
import { LandingPage } from './landing-page';

beforeEach(() => {
  const token = '123223323';
  localStorage.setItem('trelloToken', token);
  store.dispatch(login(token));
  store.dispatch(getMemberInfo(token));
});

afterEach(() => {
  localStorage.removeItem('trelloToken');
  store.dispatch(logout());
});

describe('LandingPage', () => {
  const LandingPageContainer = () => {
    const popupModalOpen = useSelector((state: RootState) => state.popup.open);
    return (
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/b/:boardId/*" element={<BoardPage />}>
          {popupModalOpen && (
            <Route path="c/:cardUrl" element={<CardPopup />} />
          )}
        </Route>
      </Routes>
    );
  };

  it('renders landing page', async () => {
    const { getByText, getByTestId, findByRole, findAllByTestId } = render(
      <LandingPage />,
    );

    expect(getByTestId('loading-spinner')).toBeInTheDocument();

    const heading = await findByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();

    if (store.getState().member.id && store.getState().boards.isLoading) {
      act(() => {
        store.dispatch(setBoards('memberId'));
      });
    }

    const boardElements = await findAllByTestId('single-board');
    expect(boardElements).toHaveLength(2);

    const { boardsArray } = store.getState().boards;
    const boardOne = getByText(boardsArray[0].name);
    expect(boardOne).toBeInTheDocument();

    const boardTwo = getByText(boardsArray[1].name);
    expect(boardTwo).toBeInTheDocument();

    const boardOneContainer = boardOne.parentNode;
    expect(boardOneContainer).toBeInTheDocument();

    const deleteButton = getByLabelText(
      boardOneContainer as HTMLElement,
      'delete-board',
    );
    expect(deleteButton).toBeInTheDocument();

    const addNewBoard = getByText(/add new/i);
    expect(addNewBoard).toBeInTheDocument();
  });

  it('deletes and adds a board on user click', async () => {
    const newBoardSampleTitle = 'New board title';

    const {
      getByText,
      getByPlaceholderText,
      getAllByTestId,
      queryByPlaceholderText,
      findByRole,
      findAllByTestId,
    } = render(<LandingPage />);
    await findByRole('heading', { level: 2 });

    if (store.getState().member.id && store.getState().boards.isLoading) {
      act(() => {
        store.dispatch(setBoards('memberId'));
      });
    }

    await findAllByTestId('single-board');

    const { boardsArray } = store.getState().boards;
    const boardTwo = getByText(boardsArray[1].name);
    const boardTwoContainer = boardTwo.parentNode;

    const deleteButtonOne = getByTestId(
      boardTwoContainer as HTMLElement,
      'delete-board-button',
    );
    userEvent.click(deleteButtonOne);

    await waitFor(() => {
      expect(boardTwo).not.toBeInTheDocument();
      expect(getAllByTestId('single-board')).toHaveLength(1);
    });

    const inputElement = queryByPlaceholderText(/start typing.../i);
    expect(inputElement).not.toBeInTheDocument();

    const addButton = getByText(/add new/i);
    userEvent.click(addButton);

    const inputElementAfterClick = getByPlaceholderText(/start typing.../i);
    expect(inputElementAfterClick).toBeInTheDocument();
    expect(addButton).not.toBeInTheDocument();

    userEvent.type(inputElementAfterClick, newBoardSampleTitle);
    expect(inputElementAfterClick.textContent).toBe(newBoardSampleTitle);

    userEvent.tab();

    await waitFor(() => {
      expect(getAllByTestId('single-board')).toHaveLength(2);
    });

    const inputElementAfterSubmit = queryByPlaceholderText(/start typing.../i);
    expect(inputElementAfterSubmit).not.toBeInTheDocument();

    const addButtonAfterSubmit = getByText(/add new/i);
    expect(addButtonAfterSubmit).toBeInTheDocument();

    const newlyCreatedBoard = getByText(newBoardSampleTitle);
    expect(newlyCreatedBoard).toBeInTheDocument();
  });

  it('throws an error on submitting empty board name', async () => {
    const { getByText, getByPlaceholderText, findByRole, findAllByTestId } =
      render(<LandingPage />);

    await findByRole('heading', { level: 2 });

    if (store.getState().member.id && store.getState().boards.isLoading) {
      act(() => {
        store.dispatch(setBoards('memberId'));
      });
    }

    expect(await findAllByTestId('single-board')).toHaveLength(2);

    const addButton = getByText(/add new/i);

    userEvent.click(addButton);
    userEvent.tab();

    await waitFor(() => {
      const state = store.getState();
      const errorMessage = state.errorHandler.errorMessage;
      expect(errorMessage).toBe('Board name cannot be empty');
    });

    store.dispatch(resetError());

    await waitFor(() => {
      const state = store.getState();
      const { errorMessage, isErrorDisplayed } = state.errorHandler;
      expect(errorMessage).toBe('');
      expect(isErrorDisplayed).toBeFalsy();
    });

    expect(await findAllByTestId('single-board')).toHaveLength(2);

    const addButton2 = getByText(/add new/i);
    userEvent.click(addButton2);

    const inputElement2 = getByPlaceholderText(/start typing.../i);
    userEvent.type(inputElement2, '     ');
    userEvent.tab();

    await waitFor(() => {
      const state = store.getState();
      const { errorMessage } = state.errorHandler;
      expect(errorMessage).toBe('Board name cannot be empty');
    });

    store.dispatch(resetError());

    await waitFor(() => {
      const state = store.getState();
      const { errorMessage, isErrorDisplayed } = state.errorHandler;
      expect(errorMessage).toBe('');
      expect(isErrorDisplayed).toBeFalsy();
    });

    expect(await findAllByTestId('single-board')).toHaveLength(2);

    const addButton3 = getByText(/add new/i);
    userEvent.click(addButton3);

    const inputElement3 = getByPlaceholderText(/start typing.../i);
    userEvent.type(inputElement3, '\n');
    userEvent.tab();

    await waitFor(() => {
      const state = store.getState();
      const { errorMessage } = state.errorHandler;
      expect(errorMessage).toBe('Board name cannot be empty');
    });

    expect(await findAllByTestId('single-board')).toHaveLength(2);
  });

  it('redirects to board URL on user click', async () => {
    const { getAllByTestId, findByRole, findAllByTestId } = render(
      <LandingPage />,
    );

    await findByRole('heading', { level: 2, name: /Your workplaces/i });

    if (store.getState().member.id && store.getState().boards.isLoading) {
      act(() => {
        store.dispatch(setBoards('memberId'));
      });
    }

    await findAllByTestId('single-board');

    const boards = getAllByTestId('single-board');
    const boardOne = boards[0];
    const boardOneName = store.getState().boards.boardsArray[0].name;
    const boardOneId = store.getState().boards.boardsArray[0].id;

    expect(boardOne).toHaveTextContent(boardOneName);

    act(() => {
      userEvent.click(boardOne);
    });

    expect(window.location.pathname).toBe(`/b/${boardOneId}`);
  });

  it('logs out on logout button click', async () => {
    const { getByRole, findByRole, findAllByTestId } = render(<LandingPage />);

    await findByRole('heading', { level: 2, name: /Your workplaces/i });

    if (store.getState().member.id && store.getState().boards.isLoading) {
      act(() => {
        store.dispatch(setBoards('memberId'));
      });
    }

    await findAllByTestId('single-board');

    const logoutButton = getByRole('button', { name: /log out/i });
    expect(logoutButton).toBeInTheDocument();

    act(() => {
      userEvent.click(logoutButton);
    });

    expect(window.location.pathname).toBe('/');
    expect(localStorage.getItem('trelloToken')).toBe(null);
    expect(store.getState().auth.isAuth).toBe(false);
    expect(store.getState().auth.APItoken).toBe('');
  });

  it('opens board page when user clicks on the board', async () => {
    const { getAllByTestId, findByRole, findAllByTestId } = render(
      <LandingPageContainer />,
    );

    await findByRole('heading', { level: 2, name: /Your workplaces/i });

    if (store.getState().member.id && store.getState().boards.isLoading) {
      act(() => {
        store.dispatch(setBoards('memberId'));
      });
    }

    await findAllByTestId('single-board');

    const boards = getAllByTestId('single-board');
    expect(boards).toHaveLength(2);

    act(() => {
      userEvent.click(boards[0]);
    });

    const boardPage = await findByRole('board');

    expect(boardPage).toBeInTheDocument();
  });
});
