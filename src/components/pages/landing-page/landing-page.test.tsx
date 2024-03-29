import userEvent from '@testing-library/user-event';
import { Route, Routes } from 'react-router-dom';
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

import { BoardPage, CardPopup } from 'components/pages';
import { SinglePage } from 'components/templates';

import { LandingPage } from './landing-page';

beforeAll(async () => {
  const token = '123223323';
  localStorage.setItem('trelloToken', token);
  store.dispatch(login(token));
  store.dispatch(getMemberInfo(token));

  await waitFor(() => {
    const state = store.getState();
    expect(state.member.id).not.toBe('');
  });

  const memberId = store.getState().member.id;
  store.dispatch(setBoards(memberId));

  await waitFor(() => {
    const state = store.getState();
    expect(state.boards.boardsArray.length).not.toBe(0);
  });
});

afterAll(() => {
  localStorage.removeItem('trelloToken');
  store.dispatch(logout());
});

describe('LandingPage', () => {
  const LandingPageContainer = () => {
    const popupModalOpen = useSelector((state: RootState) => state.popup.open);
    return (
      <SinglePage>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/b/:boardId/*" element={<BoardPage />}>
            {popupModalOpen && (
              <Route path="c/:cardUrl" element={<CardPopup />} />
            )}
          </Route>
        </Routes>
      </SinglePage>
    );
  };

  it('renders landing page', async () => {
    const { getByText, findByRole, findAllByTestId } = render(<LandingPage />);

    const heading = await findByRole('heading', { level: 2 });
    expect(heading).toBeInTheDocument();

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

  it('adds a board on user click', async () => {
    const newBoardSampleTitle = 'New board title';

    const {
      getByRole,
      getByText,
      getByPlaceholderText,
      getAllByTestId,
      queryByPlaceholderText,
      findByRole,
      findAllByTestId,
    } = render(<LandingPage />);
    await findByRole('heading', { level: 2 });

    await findAllByTestId('single-board');

    const { boardsArray } = store.getState().boards;
    const boardTwo = getByText(boardsArray[1].name);
    const boardTwoContainer = boardTwo.parentNode;

    const deleteButtonOne = getByTestId(
      boardTwoContainer as HTMLElement,
      'delete-board-button',
    );

    const deleteButtonTwo = getByTestId(
      boardTwoContainer as HTMLElement,
      'delete-board-button',
    );

    expect(deleteButtonOne).toBeInTheDocument();
    expect(deleteButtonTwo).toBeInTheDocument();

    const inputElement = queryByPlaceholderText(/start typing.../i);
    expect(inputElement).not.toBeInTheDocument();

    const addButton = getByText(/add new/i);
    userEvent.click(addButton);

    const inputElementAfterClick = getByPlaceholderText(/start typing.../i);
    expect(inputElementAfterClick).toBeInTheDocument();
    expect(addButton).not.toBeInTheDocument();

    userEvent.type(inputElementAfterClick, newBoardSampleTitle);
    expect(inputElementAfterClick.textContent).toBe(newBoardSampleTitle);

    userEvent.click(getByRole('button', { name: 'Create' }));

    await waitFor(() => {
      expect(getAllByTestId('single-board')).toHaveLength(3);
    });

    const inputElementAfterSubmit = queryByPlaceholderText(/start typing.../i);
    expect(inputElementAfterSubmit).not.toBeInTheDocument();

    const addButtonAfterSubmit = getByText(/add new/i);
    expect(addButtonAfterSubmit).toBeInTheDocument();

    const newlyCreatedBoard = getByText(newBoardSampleTitle);
    expect(newlyCreatedBoard).toBeInTheDocument();
  });

  it('throws an error on submitting empty board name', async () => {
    const {
      getByRole,
      getByText,
      getByPlaceholderText,
      findByRole,
      findAllByTestId,
    } = render(<LandingPage />);
    await findByRole('heading', { level: 2 });
    expect(await findAllByTestId('single-board')).toHaveLength(3);
    const addButton = getByText(/add new/i);
    userEvent.click(addButton);
    userEvent.click(getByRole('button', { name: 'Create' }));

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
    expect(await findAllByTestId('single-board')).toHaveLength(3);
    const addButton2 = getByText(/add new/i);
    userEvent.click(addButton2);
    const inputElement2 = getByPlaceholderText(/start typing.../i);
    userEvent.type(inputElement2, '     ');
    userEvent.click(getByRole('button', { name: 'Create' }));

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
    expect(await findAllByTestId('single-board')).toHaveLength(3);
    const addButton3 = getByText(/add new/i);
    userEvent.click(addButton3);
    const inputElement3 = getByPlaceholderText(/start typing.../i);
    userEvent.type(inputElement3, '\n');
    userEvent.click(getByRole('button', { name: 'Create' }));

    await waitFor(() => {
      const state = store.getState();
      const { errorMessage } = state.errorHandler;
      expect(errorMessage).toBe('Board name cannot be empty');
    });
    expect(await findAllByTestId('single-board')).toHaveLength(3);
  });

  it('redirects to board URL on user click', async () => {
    const { getAllByTestId, findByRole, findAllByTestId } = render(
      <LandingPage />,
    );
    await findByRole('heading', { level: 2, name: /Your workplaces/i });
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
    const { getByRole, findByRole, findAllByTestId } = render(
      <SinglePage>
        <LandingPage />
      </SinglePage>,
    );
    await findByRole('heading', { level: 2, name: /Your workplaces/i });
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
    await findAllByTestId('single-board');
    const boards = getAllByTestId('single-board');
    expect(boards).toHaveLength(3);
    act(() => {
      userEvent.click(boards[0]);
    });
    const boardPage = await findByRole('board');
    expect(boardPage).toBeInTheDocument();
  });
});
