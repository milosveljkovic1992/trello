import { ForwardedRef, forwardRef } from 'react';

import { useAppDispatch } from 'store';
import { submitBoardName } from 'store/board-slice';

import { HomeButton, LogoutButton } from 'components/atoms';
import { BoardProps } from './board.types';
import { Container } from './board.styles';

// eslint-disable-next-line react/display-name
export const Board = forwardRef(
  (
    {
      children,
      board,
      boardName,
      setBoardName,
      isActive,
      setIsActive,
    }: BoardProps,
    ref: ForwardedRef<HTMLInputElement>,
  ) => {
    const dispatch = useAppDispatch();

    const handleBoardName = () => {
      if (boardName.trim().length > 0) {
        dispatch(submitBoardName({ board, boardName, setBoardName }));
      }
      setIsActive(false);
    };

    return (
      <Container backgroundImage={board?.prefs.backgroundImage} role="board">
        <header className="board-header" role="page-header">
          <HomeButton />

          <div className="board-title-container">
            {boardName && !isActive && (
              <h1 className="board-title" onClick={() => setIsActive(true)}>
                {boardName}
              </h1>
            )}

            {isActive && (
              <input
                className="board-title-input"
                ref={ref}
                value={boardName}
                onChange={(e) => setBoardName(e.target.value)}
                onBlur={handleBoardName}
                size={boardName.length - 6}
                data-testid="board-title-input"
              ></input>
            )}
          </div>

          <LogoutButton fixed={false} />
        </header>

        {children}
      </Container>
    );
  },
);
