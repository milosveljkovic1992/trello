import { useEffect, useState, useRef } from 'react';

import { useSelector } from 'react-redux';

import { RootState } from 'store';
import { CardType } from 'store/card-slice';
export interface useSingleCardProps {
  card: CardType;
}

export const useSingleCard = ({ card }: useSingleCardProps) => {
  const { isEditPanelOpen, editPanelId } = useSelector(
    (state: RootState) => state.board,
  );
  const [rect, setRect] = useState<DOMRect>({} as DOMRect);

  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isEditPanelOpen && card.id === editPanelId) {
      const boundingClientReact = cardRef.current?.getBoundingClientRect();
      if (boundingClientReact) {
        setRect(boundingClientReact);
      }
    }
  }, [isEditPanelOpen]);

  return { rect, cardRef };
};
