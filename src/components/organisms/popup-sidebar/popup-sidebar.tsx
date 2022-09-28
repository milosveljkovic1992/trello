import { MouseEvent, useState } from 'react';

import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { CgCreditCard } from 'react-icons/cg';
import { ImArrowRight2, ImCross } from 'react-icons/im';

import { RootState, useAppDispatch } from 'store';
import { setCardMove } from 'store/card-move-slice';
import { deleteCard, resetCard } from 'store/card-slice';
import { openMiniModal } from 'store/mini-modal-slice';
import { closeModal } from 'store/popup-slice';

import { PopupSidebarButton } from 'components/atoms';
import { WarningModal } from 'components/molecules';
import { MiniModal } from 'components/organisms';

import { Sidebar } from './popup-sidebar.styles';

export const PopupSidebar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const urlParams = useParams();
  const { boardId } = urlParams;

  const card = useSelector((state: RootState) => state.card.details);
  const { isMiniModalOpen } = useSelector(
    (state: RootState) => state.miniModal,
  );

  const [isWarningDisplayed, setIsWarningDisplayed] = useState(false);
  const [miniModalTabRect, setMiniModalTabRect] = useState<DOMRect>();

  const handleOpenMiniModal = (option: 'Move' | 'Copy') => {
    dispatch(setCardMove({ card }));
    dispatch(openMiniModal(option));
  };

  const handleDelete = () => {
    dispatch(deleteCard(card));
    navigate(`/b/${boardId}`);
    dispatch(closeModal());
    dispatch(resetCard());
  };

  const handleRect = (e: MouseEvent) => {
    const target = e.target as Element;
    const element = target.closest('.minimodal-button');
    setMiniModalTabRect(element?.getBoundingClientRect());
  };

  return (
    <Sidebar>
      <h3>Actions</h3>

      <div className="sidebar-button-container">
        <span className="minimodal-button" onClick={handleRect}>
          <PopupSidebarButton
            icon={<ImArrowRight2 />}
            handleClick={() => handleOpenMiniModal('Move')}
          >
            Move
          </PopupSidebarButton>
        </span>

        <span className="minimodal-button" onClick={handleRect}>
          <PopupSidebarButton
            icon={<CgCreditCard />}
            handleClick={() => handleOpenMiniModal('Copy')}
          >
            Copy
          </PopupSidebarButton>
        </span>

        <PopupSidebarButton
          handleClick={() => setIsWarningDisplayed(true)}
          icon={<ImCross />}
        >
          Delete
        </PopupSidebarButton>
      </div>

      {isMiniModalOpen && miniModalTabRect && (
        <MiniModal rect={miniModalTabRect} />
      )}

      {isWarningDisplayed && (
        <WarningModal
          handleDelete={handleDelete}
          handleCancel={() => setIsWarningDisplayed(false)}
        >
          Delete card?
        </WarningModal>
      )}
    </Sidebar>
  );
};
