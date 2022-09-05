import { useEffect, useRef } from 'react';

import { FaRegComment } from 'react-icons/fa';
import { HiViewList } from 'react-icons/hi';

import { CardBadge } from 'components/molecules';

import { SingleCardContentProps } from './single-card-content.types';
import { Container } from './single-card-content-styles';

export const SingleCardContent = ({
  card,
  isEditPanelOpen,
  editPanelId,
  handleRect,
}: SingleCardContentProps) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isEditPanelOpen && card.id === editPanelId) {
      const boundingClientReact = cardRef.current?.getBoundingClientRect();
      if (boundingClientReact && handleRect) {
        handleRect(boundingClientReact);
      }
    }
  }, [isEditPanelOpen]);

  return (
    <Container>
      <div className="card-content-box" ref={cardRef}>
        <p className="card-title">{card.name}</p>
        {(card.badges.description || !!card.badges.comments) && (
          <div className="badges" data-testid="card-badges">
            {card.badges.description && <CardBadge icon={<HiViewList />} />}
            {!!card.badges.comments && (
              <CardBadge icon={<FaRegComment />} count={card.badges.comments} />
            )}
          </div>
        )}
      </div>
    </Container>
  );
};
