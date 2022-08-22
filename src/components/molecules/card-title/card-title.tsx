import { useEffect, useRef } from 'react';

import { useSelector } from 'react-redux';

import { RootState, useAppDispatch } from 'store';
import { startEditingTitle } from 'store/card-slice';

import { useCardTitle } from './useCardTitle';
import { Container } from './card-title.styles';

export const CardTitle = () => {
  const dispatch = useAppDispatch();
  const card = useSelector((state: RootState) => state.card.details);
  const { isEditTitleActive } = useSelector((state: RootState) => state.card);
  const { title, setTitle, handleRename } = useCardTitle({ card });

  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditTitleActive) {
      titleRef.current?.select();
    }
  }, [isEditTitleActive]);

  return (
    <Container role="card-title" isEditTitleActive={isEditTitleActive}>
      {!isEditTitleActive && (
        <h2 onClick={() => dispatch(startEditingTitle())}>{title}</h2>
      )}
      {isEditTitleActive && (
        <input
          ref={titleRef}
          type="text"
          onBlur={() => handleRename()}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      )}
    </Container>
  );
};