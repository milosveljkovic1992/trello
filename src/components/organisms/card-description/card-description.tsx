import { useState, useEffect, useRef, MouseEvent } from 'react';

import { useSelector } from 'react-redux';
import { AiOutlineClose } from 'react-icons/ai';

import { RootState, useAppDispatch } from 'store';
import { editDescription } from 'store/card-slice';

import { Container } from './card-description.styles';

export const CardDescription = () => {
  const dispatch = useAppDispatch();
  const card = useSelector((state: RootState) => state.card.details);
  const [description, setDescription] = useState(card.desc);
  const [previousDescription, setPreviousDescription] = useState('');
  const [isDescriptionInputActive, setIsDescriptionInputActive] =
    useState(false);

  const descRef = useRef<HTMLTextAreaElement>(null);

  const handleEdit = () => {
    dispatch(editDescription({ card, description }));
    setDescription(card.desc);
  };

  const handleActive = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as Element;
    if (target.closest('.desc-btn')) {
      setIsDescriptionInputActive(false);
    } else {
      setIsDescriptionInputActive(true);
    }
  };

  useEffect(() => {
    if (isDescriptionInputActive) {
      descRef.current?.select();
    }
    setPreviousDescription(description);
  }, [isDescriptionInputActive]);

  useEffect(() => {
    setDescription(card.desc);
  }, [card]);

  return (
    <Container
      isActive={isDescriptionInputActive}
      onClick={handleActive}
      className="desc-box"
      hasDescription={!!description}
      data-testid="card-description-container"
    >
      {!isDescriptionInputActive && (
        <p className="desc-content" data-testid="card-description-content">
          {description || 'Add a more detailed description...'}
        </p>
      )}

      {isDescriptionInputActive && (
        <>
          <textarea
            className="desc-input"
            placeholder="Add a more detailed description..."
            ref={descRef}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>

          <div
            className="icon-container"
            data-testid="description-icon-container"
          >
            <div className="btn-container">
              <button className="desc-btn" onClick={handleEdit}>
                Save
              </button>

              <div
                className="desc-btn close-icon-container"
                onClick={() => {
                  setIsDescriptionInputActive(false);
                  setDescription(previousDescription);
                }}
                data-testid="close-icon-container"
              >
                <AiOutlineClose />
              </div>
            </div>
          </div>
        </>
      )}
    </Container>
  );
};
