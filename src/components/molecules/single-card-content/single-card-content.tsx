import { ForwardedRef, forwardRef } from 'react';

import { FaRegComment } from 'react-icons/fa';
import { HiViewList } from 'react-icons/hi';

import type { CardType } from 'store/card-slice';
import { CardBadge } from 'components/molecules';

import { Container } from './single-card-content-styles';

interface SingleCardContentProps {
  card: CardType;
}

// eslint-disable-next-line react/display-name
export const SingleCardContent = forwardRef(
  ({ card }: SingleCardContentProps, ref: ForwardedRef<HTMLDivElement>) => {
    return (
      <Container>
        <div className="card-content-box" ref={ref}>
          <p className="card-title">{card.name}</p>
          {(card.badges.description || !!card.badges.comments) && (
            <div className="badges" data-testid="card-badges">
              {card.badges.description && <CardBadge icon={<HiViewList />} />}
              {!!card.badges.comments && (
                <CardBadge
                  icon={<FaRegComment />}
                  count={card.badges.comments}
                />
              )}
            </div>
          )}
        </div>
      </Container>
    );
  },
);
