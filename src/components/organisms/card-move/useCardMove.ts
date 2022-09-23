import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { RootState, useAppDispatch } from 'store';
import { closeEditPanel } from 'store/board-slice';
import { CardType } from 'store/card-slice';
import { moveCard } from 'store/cards-slice';
import { closeModal } from 'store/popup-slice';

interface useCardMoveProps {
  card: CardType;
  targetList: string;
  pos: number;
  handleClosePanel: () => void;
}

export const useCardMove = ({
  card,
  targetList,
  pos,
  handleClosePanel,
}: useCardMoveProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const urlParams = useParams();
  const { boardId } = urlParams;

  const isPopupOpen = useSelector((state: RootState) => state.popup.open);

  const handleMove = () => {
    dispatch(moveCard({ card, targetList, pos }));
    dispatch(closeEditPanel());
    handleClosePanel();

    if (isPopupOpen) {
      dispatch(closeModal());
      navigate(`/b/${boardId}`);
    }
  };

  return handleMove;
};
