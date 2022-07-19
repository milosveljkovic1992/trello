import React from 'react';

import { ImHome } from 'react-icons/im';

import { LogoutButton } from 'components/atoms';
import { Container } from './board-styles';

// eslint-disable-next-line react/display-name
export const Board = React.forwardRef(
  (
    {
      children,
      board,
      boardName,
      setBoardName,
      handleBoardName,
      handleHomeButton,
      isActive,
      setIsActive,
    },
    ref,
  ) => {
    return (
      <Container
        backgroundImage={board?.prefs.backgroundImage}
        isActive={isActive}
      >
        <header className="board-header">
          <div className="board-icon-container" onClick={handleHomeButton}>
            <ImHome />
          </div>

          <div className="board-title-container">
            {boardName && (
              <h1 className="board-title" onClick={() => setIsActive(true)}>
                {boardName}
              </h1>
            )}

            <input
              className="board-title-input"
              ref={ref}
              value={boardName}
              onChange={(e) => setBoardName(e.target.value)}
              onBlur={handleBoardName}
              size={boardName.length - 6}
            ></input>
          </div>

          <LogoutButton />
        </header>

        {children}
      </Container>
    );
  },
);
