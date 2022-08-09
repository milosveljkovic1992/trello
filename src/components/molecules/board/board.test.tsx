import { useRef, useState } from 'react';
import { render } from 'utils/test-utils';

import { BoardType } from 'store/board-slice';
import { Board } from './board';
import userEvent from '@testing-library/user-event';

const BoardContainer = () => {
  const board: BoardType = {
    id: '123',
    name: 'board name',
    prefs: {
      backgroundImage: 'string',
      backgroundImageScaled: [
        {
          url: 'string 1',
        },
        {
          url: 'string 2',
        },
        {
          url: 'string 3',
        },
      ],
    },
  };
  const [boardName, setBoardName] = useState(board.name);
  const [isActive, setIsActive] = useState(false);
  const titleRef = useRef<HTMLInputElement>(null);

  return (
    <Board
      board={board}
      boardName={boardName}
      setBoardName={setBoardName}
      isActive={isActive}
      setIsActive={setIsActive}
      ref={titleRef}
    >
      <div className="board-inner-container"></div>
    </Board>
  );
};

describe('Board', () => {
  it('renders component', () => {
    const { getByRole, queryByTestId } = render(<BoardContainer />);

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

  it('hides title and renders input on user click', () => {
    const { getByRole, getByTestId, queryByRole, queryByTestId } = render(
      <BoardContainer />,
    );

    const titleElement = getByRole('heading', { level: 1 });
    expect(titleElement).toBeInTheDocument();

    const inputElement = queryByTestId('board-title-input');
    expect(inputElement).not.toBeInTheDocument();

    userEvent.click(titleElement);
    const titleElementAfterClicking = queryByRole('heading', { level: 1 });
    expect(titleElementAfterClicking).not.toBeInTheDocument();

    const inputElementAfterClicking = getByTestId('board-title-input');
    expect(inputElementAfterClicking).toBeInTheDocument();
  });

  it('changes title on input', () => {
    const sampleTitle = 'new title';
    const { getByRole, getByTestId, queryByTestId } = render(
      <BoardContainer />,
    );

    const titleElement = getByRole('heading', { level: 1 });
    expect(titleElement).toBeInTheDocument();

    userEvent.click(titleElement);
    const inputElement = getByTestId('board-title-input');
    userEvent.clear(inputElement);
    userEvent.type(inputElement, sampleTitle);
    const boardElement = getByRole('page-header');
    userEvent.click(boardElement);

    const inputElementAfterInput = queryByTestId('board-title-input');
    expect(inputElementAfterInput).not.toBeInTheDocument();

    const titleElementAfterInput = getByRole('heading', { level: 1 });
    expect(titleElementAfterInput).toBeInTheDocument();
    expect(titleElementAfterInput.textContent).toBe(sampleTitle);
  });
});
