import { useEffect, useState, useRef } from 'react';

import { useSelector } from 'react-redux';

import { RootState } from 'store';
import { useCardTitle } from './useCardTitle';

import { Container } from './card-title.styles';

export const CardTitle = () => {
  const card = useSelector((state: RootState) => state.card.details);
  const [isEditTitleActive, setIsEditTitleActive] = useState(false);
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
        <h2 onClick={() => setIsEditTitleActive(true)}>{title}</h2>
      )}
      {isEditTitleActive && (
        <input
          ref={titleRef}
          type="text"
          onBlur={() => handleRename(setIsEditTitleActive)}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      )}
    </Container>
  );
};
