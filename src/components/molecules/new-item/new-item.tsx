import { useEffect, useRef } from 'react';

import { AiOutlineClose } from 'react-icons/ai';

import { NewItemProps } from './new-item.types';
import { Container } from './new-item.styles';

export const NewItem = ({
  children,
  handleInput,
  handleEnter,
  handleSubmit,
  handleClose,
  placeholder,
  input,
}: NewItemProps) => {
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <Container className="new-item" data-testid="new-item">
      <div className="input-container">
        <textarea
          ref={inputRef}
          placeholder={placeholder}
          onChange={handleInput}
          onKeyDown={handleEnter}
          value={input}
        ></textarea>
      </div>

      <div className="button-container">
        <button onClick={handleSubmit}>{children}</button>
        <div
          className="icon-container"
          onClick={handleClose}
          data-testid="close-button"
        >
          <AiOutlineClose />
        </div>
      </div>
    </Container>
  );
};
