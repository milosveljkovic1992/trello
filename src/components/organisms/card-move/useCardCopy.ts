import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { RootState, useAppDispatch } from 'store';
import { closeEditPanel } from 'store/board-slice';
import { CardType } from 'store/card-slice';
import { copyCard } from 'store/cards-slice';
import { closeModal } from 'store/popup-slice';

interface useCardCopyProps {
  card: CardType;
  targetList: string;
  pos: number;
  handleClosePanel: () => void;
}

export const useCardCopy = ({
  card,
  targetList,
  pos,
  handleClosePanel,
}: useCardCopyProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const urlParams = useParams();
  const { boardId } = urlParams;

  const isPopupOpen = useSelector((state: RootState) => state.popup.open);

  const handleCopy = () => {
    dispatch(copyCard({ card, targetList, pos }));
    dispatch(closeEditPanel());
    handleClosePanel();

    if (isPopupOpen) {
      dispatch(closeModal());
      navigate(`/b/${boardId}`);
    }
  };

  return handleCopy;
};
