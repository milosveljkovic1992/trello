import { useEffect, useState, useRef } from 'react';

import { useSelector } from 'react-redux';

import { RootState } from 'store';
import { useCardTitle } from 'hooks/useCardTitle';

import { Container } from './card-title.styles';

export const CardTitle = () => {
  const card = useSelector((state: RootState) => state.card.details);
  const [isActive, setIsActive] = useState(false);
  const { title, setTitle, handleRename } = useCardTitle({ card });

  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isActive) {
      titleRef.current?.select();
    }
  }, [isActive]);

  return (
    <Container aria-label="card-title-container" isActive={isActive}>
      {!isActive && <h2 onClick={() => setIsActive(true)}>{title}</h2>}
      {isActive && (
        <input
          ref={titleRef}
          aria-label="card-title-input"
          onBlur={() => handleRename(setIsActive)}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      )}
    </Container>
  );
};
