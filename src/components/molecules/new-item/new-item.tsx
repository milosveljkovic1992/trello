import { useEffect, useRef } from 'react';

import { AiOutlineClose } from 'react-icons/ai';
import { NewItemProps } from './new-item.props';

import { Container } from './new-item.styles';

export const NewItem = ({
  children,
  handleInput,
  handleSubmit,
  handleClose,
  placeholder,
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
        ></textarea>
      </div>

      <div className="button-container">
        <button onClick={handleSubmit}>{children}</button>
        <div className="icon-container" onClick={handleClose}>
          <AiOutlineClose />
        </div>
      </div>
    </Container>
  );
};
