import { FaRegComment } from 'react-icons/fa';
import { HiViewList } from 'react-icons/hi';
import { useSelector } from 'react-redux';

import { RootState } from 'store';

import { Container } from './drag-and-drop-placeholder.styles';

export const DragAndDropPlaceholder = ({ id }: { id: string }) => {
  const cards = useSelector((state: RootState) => state.cards.cardsArray);
  const card = cards.find((card) => card.id === id);

  if (!card) return <div style={{ height: '59px' }}></div>;

  return (
    <Container>
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
