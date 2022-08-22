import { MouseEvent, SetStateAction } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'store';
import { closeEditPanel } from 'store/board-slice';

import { CardType, deleteCard, getCard } from 'store/card-slice';
import { throwError } from 'store/error-slice';
import { openModal } from 'store/popup-slice';

interface UseEditPanelProps {
  isMoveOpen: boolean;
  setIsMoveOpen: React.Dispatch<SetStateAction<boolean>>;
}

export const useEditPanel = ({
  isMoveOpen,
  setIsMoveOpen,
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
      isMoveOpen ? setIsMoveOpen(false) : dispatch(closeEditPanel());
    }
  };

  const handleOpen = (card: CardType) => {
    const { id }: { id: string } = card;
    navigate(`c/${card.id}`);
    dispatch(closeEditPanel());
    try {
      dispatch(getCard({ id }));
      dispatch(openModal(id));
    } catch (error) {
      dispatch(throwError('Could not open card'));
    }
  };

  return { handleOpen, handleDisplay, handleDelete };
};