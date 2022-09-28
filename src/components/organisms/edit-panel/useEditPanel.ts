import { MouseEvent } from 'react';

import { useNavigate } from 'react-router-dom';

import { useAppDispatch } from 'store';
import { closeEditPanel } from 'store/board-slice';
import { CardType, deleteCard } from 'store/card-slice';
import { closeMiniModal } from 'store/mini-modal-slice';

export const useEditPanel = ({
  isMiniModalOpen,
}: {
  isMiniModalOpen: boolean;
}) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleDelete = (card: CardType) => {
    dispatch(deleteCard(card));
    dispatch(closeEditPanel());
  };

  const handleClose = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as Element;
    if (target.classList.contains('card-edit__overlay')) {
      isMiniModalOpen ? dispatch(closeMiniModal()) : dispatch(closeEditPanel());
    }
  };

  const handleOpen = (card: CardType) => {
    navigate(`c/${card.id}`);
    dispatch(closeEditPanel());
  };

  return { handleOpen, handleClose, handleDelete };
};
