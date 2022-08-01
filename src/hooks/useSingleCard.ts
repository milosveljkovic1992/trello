import { useEffect, useState, useRef, Dispatch, SetStateAction } from 'react';

import { useNavigate } from 'react-router-dom';

import { deleteCard, getCard } from 'store/card-slice';
import { moveCard } from 'store/cards-slice';
import { openModal } from 'store/popup-slice';
import type { CardType } from 'store/card-slice';

import { throwError } from 'store/error-slice';
import { useAppDispatch } from 'store';

export interface useSingleCardProps {
  card: CardType;
  setIsListUpdated: Dispatch<SetStateAction<boolean>>;
}

export const useSingleCard = ({
  setIsListUpdated,
  card,
}: useSingleCardProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isMoveOpen, setIsMoveOpen] = useState(false);
  const [rect, setRect] = useState<DOMRect>({} as DOMRect);

  const cardRef = useRef<HTMLDivElement>(null);

  const handleOpen = (card: CardType) => {
    const { id }: { id: string } = card;
    navigate(`c/${card.id}`);
    setIsEditOpen(false);
    try {
      dispatch(getCard({ id }));
      dispatch(openModal(id));
    } catch (error) {
      dispatch(throwError('Could not open card'));
    }
  };

  const handleDelete = (card: CardType) => {
    dispatch(deleteCard(card));
    setIsEditOpen(false);
  };

  const handleMove = (
    card: CardType,
    targetList: string,
    targetPosition: number,
  ) => {
    dispatch(moveCard({ card, targetList, targetPosition, setIsListUpdated }));

    setIsEditOpen(false);
    setIsMoveOpen(false);
  };

  useEffect(() => {
    if (isEditOpen) {
      const boundingClientReact = cardRef.current?.getBoundingClientRect();
      if (boundingClientReact) {
        setRect(boundingClientReact);
      }
    }
  }, [isEditOpen]);

  return {
    card,
    rect,
    isEditOpen,
    setIsEditOpen,
    isMoveOpen,
    setIsMoveOpen,
    handleOpen,
    handleMove,
    handleDelete,
    cardRef,
  };
};
