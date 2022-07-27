import { useEffect, useState } from 'react';

import { useSelector } from 'react-redux';

import { useCardTitle } from 'hooks/useCardTitle';

import { Container } from './card-title-styles';

export const CardTitle = () => {
  const card = useSelector((state) => state.card.details);
  const [isActive, setIsActive] = useState(false);
  const { title, setTitle, handleRename, titleRef } = useCardTitle({ card });

  useEffect(() => {
    if (isActive) {
      titleRef.current.select();
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
