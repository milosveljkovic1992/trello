import { useRef } from 'react';
import { FaRegComment } from 'react-icons/fa';
import { HiViewList } from 'react-icons/hi';
import { useSelector } from 'react-redux';

import { RootState } from 'store';

import { Container } from './card-placeholder.styles';

export const CardPlaceholder = ({ id }: { id: string }) => {
  const cards = useSelector((state: RootState) => state.cards.cardsArray);
  const card = cards.find((card) => card.id === id);

  const placeholderRef = useRef<HTMLDivElement>(null);

  if (!card) return <div style={{ height: '70px' }}></div>;

  return (
    <Container ref={placeholderRef}>
      <div className="card-content-box">
        <p className="card-title">{card.name}</p>
        {(card.badges.description || !!card.badges.comments) && (
          <div className="badges" data-testid="card-badges">
            {card.badges.description && (
              <div className="badge-icon-container">
                <span className="badge-icon">
                  <HiViewList />
                </span>
              </div>
            )}
            {!!card.badges.comments && (
              <div className="badge-icon-container">
                <span className="badge-icon">
                  <FaRegComment />
                </span>
                <span className="badge-count">{card.badges.comments}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </Container>
  );
};