import { useSelector } from 'react-redux';

import { RootState, useAppDispatch } from 'store';
import { resetCardMove } from 'store/card-move-slice';
import { closeMiniModal } from 'store/mini-modal-slice';

import { CardMove } from 'components/organisms';

import { Modal } from './mini-modal.styles';

export const MiniModal = ({ rect }: { rect: DOMRect }) => {
  const dispatch = useAppDispatch();
  const { modalCurrentlyOpen } = useSelector(
    (state: RootState) => state.miniModal,
  );

  const handleClose = (e: MouseEvent) => {
    const target = e.target as Element;
    if (target.classList.contains('minimodal-overlay')) {
      dispatch(closeMiniModal());
      dispatch(resetCardMove());
    }
  };

  return (
    <Modal
      className="minimodal-overlay"
      onClick={handleClose}
      rect={rect}
      position={rect.x + 300 > window.innerWidth ? 'right' : 'left'}
    >
      <div className="minimodal-container">
        {modalCurrentlyOpen === 'Move' && <CardMove>Move</CardMove>}

        {modalCurrentlyOpen === 'Copy' && <CardMove>Copy</CardMove>}
      </div>
    </Modal>
  );
};
