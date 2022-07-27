import { useEffect, useState, useRef } from 'react';

import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { deleteCard, getCard } from 'store/card-slice';
import { moveCard } from 'store/cards-slice';
import { openModal } from 'store/popup-slice';

import { throwError } from 'store/error-slice';

export const useSingleCard = ({ setIsListUpdated, card }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isMoveOpen, setIsMoveOpen] = useState(false);
  const [rect, setRect] = useState(null);

  const cardRef = useRef(null);

  const handleOpen = (card) => {
    const { id } = card;
    navigate(`c/${card.id}`);
    setIsEditOpen(false);
    try {
      dispatch(getCard({ id }));
      dispatch(openModal(id));
    } catch (error) {
      dispatch(throwError('Could not open card'));
    }
  };

  const handleDelete = (card) => {
    dispatch(deleteCard(card));
    setIsEditOpen(false);
  };

  const handleMove = (card, targetList, targetPosition) => {
    dispatch(moveCard({ card, targetList, targetPosition, setIsListUpdated }));

    setIsEditOpen(false);
    setIsMoveOpen(false);
  };

  useEffect(() => {
    if (isEditOpen) {
      setRect(cardRef.current.getBoundingClientRect());
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
