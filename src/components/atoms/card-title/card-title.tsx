import { useEffect, useState, useRef } from 'react';

import { useSelector } from 'react-redux';

import { RootState } from 'store';
import { useCardTitle } from 'hooks/useCardTitle';
import type { CardType } from 'store/card-slice';

import { Container } from './card-title.styles';

export const CardTitle = () => {
  const card: CardType = useSelector((state: RootState) => state.card.details);
  const [isActive, setIsActive] = useState<boolean>(false);
  const { title, setTitle, handleRename } = useCardTitle({ card });

  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isActive) {
      titleRef.current?.select();
    }
  }, [isActive]);

  return (
    <Container isActive={isActive}>
      {!isActive ? (
        <h2 onClick={() => setIsActive(true)}>{title}</h2>
      ) : (
        <input
          ref={titleRef}
          onBlur={() => handleRename(setIsActive)}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      )}
    </Container>
  );
};
