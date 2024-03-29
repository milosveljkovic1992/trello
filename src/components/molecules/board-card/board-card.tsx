import { useState } from 'react';

import { WarningModal } from 'components/molecules';

import { BoardCardProps } from './board-card.types';
import { Container } from './board-card.styles';

export const BoardCard = ({
  board,
  icon,
  handleClick,
  handleDelete,
}: BoardCardProps) => {
  const { id } = board;
  const [isWarningDisplayed, setIsWarningDisplayed] = useState(false);

  return (
    <Container
      data-testid="single-board"
      className="single-board-container"
      key={board.id}
      onClick={(e) => handleClick(e, board)}
      style={{
        backgroundImage: board.prefs.backgroundImageScaled
          ? `url("${board.prefs.backgroundImageScaled[2].url}")`
          : 'none',
      }}
    >
      <div className="board-box">
        <h3 className="board-box-title">{board.name}</h3>
        <div
          data-testid="delete-board-button"
          aria-label="delete-board"
          className="delete-container delete-btn"
          onClick={() => setIsWarningDisplayed(true)}
        >
          {icon}
        </div>
      </div>

      {isWarningDisplayed && (
        <WarningModal
          handleDelete={() => handleDelete(id)}
          handleCancel={() => setIsWarningDisplayed(false)}
        >
          Delete board?
        </WarningModal>
      )}
    </Container>
  );
};
