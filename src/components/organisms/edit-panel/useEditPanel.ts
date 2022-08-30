import { MouseEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'store';
import { closeEditPanel } from 'store/board-slice';

import { CardType, deleteCard } from 'store/card-slice';

interface UseEditPanelProps {
  isMoveOpen: boolean;
  handleCloseMove: () => void;
}

export const useEditPanel = ({
  isMoveOpen,
  handleCloseMove,
}: UseEditPanelProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleDelete = (card: CardType) => {
    dispatch(deleteCard(card));
    dispatch(closeEditPanel());
  };

  const handleDisplay = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as Element;
    if (target.classList.contains('card-edit__overlay')) {
      isMoveOpen ? handleCloseMove() : dispatch(closeEditPanel());
    }
  };

  const handleOpen = (card: CardType) => {
    navigate(`c/${card.id}`);
    dispatch(closeEditPanel());
  };

  return { handleOpen, handleDisplay, handleDelete };
};
