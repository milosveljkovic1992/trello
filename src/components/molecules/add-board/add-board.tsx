import { useRef, useEffect } from 'react';

import { AddBoardProps } from './add-board.types';
import { Container } from './add-board.styles';

export const AddBoard = ({
  handleActive,
  isInputActive,
  newBoardTitle,
  handleCreateNew,
  handleTitleChange,
}: AddBoardProps) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isInputActive) {
      inputRef.current?.focus();
      btnRef.current?.classList.add('slide-in-top');
    }
  }, [isInputActive]);

  return (
    <Container className="single-board-container">
      <div className="board-box" onClick={handleActive}>
        {!isInputActive && <h3 className="board-box-title">Add new</h3>}
        {isInputActive && (
          <textarea
            ref={inputRef}
            placeholder="Start typing..."
            value={newBoardTitle}
            onBlur={handleCreateNew}
            onChange={handleTitleChange}
          ></textarea>
        )}
      </div>

      <button
        ref={btnRef}
        className={`create-new-button ${!isInputActive && 'isInputActive'}`}
        onClick={handleCreateNew}
      >
        Create
      </button>
    </Container>
  );
};
