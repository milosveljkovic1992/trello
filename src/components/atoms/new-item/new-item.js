import React, { useEffect } from 'react';

import { AiOutlineClose } from 'react-icons/ai';

import { Container } from './new-item-styles';

export const NewItem = ({
  children,
  handleInput,
  handleSubmit,
  setIsCreatingNew,
  placeholder,
}) => {
  const inputRef = React.useRef();

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <Container className="new-item">
      <div className="input-container">
        <textarea
          ref={inputRef}
          placeholder={placeholder}
          onChange={handleInput}
        ></textarea>
      </div>

      <div className="button-container">
        <button onClick={handleSubmit}>{children}</button>
        <div className="icon-container" onClick={() => setIsCreatingNew(false)}>
          <AiOutlineClose />
        </div>
      </div>
    </Container>
  );
};
