import { KeyboardEvent, MouseEvent, useEffect, useState, useRef } from 'react';

import { useSelector } from 'react-redux';
import { CgCreditCard } from 'react-icons/cg';
import { ImArrowRight2, ImCross } from 'react-icons/im';

import { RootState, useAppDispatch } from 'store';
import { closeEditPanel } from 'store/board-slice';
import { setCardMove } from 'store/card-move-slice';
import { openMiniModal } from 'store/mini-modal-slice';

import { EditPanelTab } from 'components/atoms';
import { WarningModal } from 'components/molecules';
import { MiniModal } from 'components/organisms';
import { useCardTitle } from 'components/organisms/card-title/useCardTitle';

import { useEditPanel } from './useEditPanel';
import { EditPanelProps } from './edit-panel.types';
import { Overlay } from './edit-panel.styles';

export const EditPanel = ({ card, rect, index }: EditPanelProps) => {
  const dispatch = useAppDispatch();
  const { isMiniModalOpen } = useSelector(
    (state: RootState) => state.miniModal,
  );

  const [isLoading, setIsLoading] = useState(true);
  const [isWarningDisplayed, setIsWarningDisplayed] = useState(false);
  const [editPanelTabRect, setEditPanelTabRect] = useState<DOMRect>();

  const handleEnter = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.code === 'Enter') {
      if (card.name !== title) {
        handleRename();
      }
      dispatch(closeEditPanel());
    }
  };

  const { title, setTitle, handleRename } = useCardTitle({ card });
  const { handleOpen, handleClose, handleDelete } = useEditPanel({
    isMiniModalOpen,
  });

  const titleRef = useRef<HTMLTextAreaElement>(null);
  const animationRef = useRef<HTMLDivElement>(null);

  const handleRect = (e: MouseEvent) => {
    const target = e.target as Element;
    const element = target.closest('.minimodal-button');
    setEditPanelTabRect(element?.getBoundingClientRect());
  };

  const handleOpenMiniModal = (option: 'Move' | 'Copy') => {
    dispatch(setCardMove({ card, index }));
    dispatch(openMiniModal(option));
  };

  useEffect(() => {
    if (!isLoading) {
      titleRef.current?.select();
      animationRef.current?.classList.add('card-edit');
    }
    setIsLoading(false);
  }, [isLoading, rect]);

  if (isLoading) {
    return <></>;
  }

  return (
    <Overlay
      className="card-edit__overlay"
      onClick={handleClose}
      rect={rect}
      direction={
        rect.x + rect.width + 120 > window.innerWidth ? 'right' : 'left'
      }
      data-testid="edit-panel"
    >
      <div className="container">
        <textarea
          ref={titleRef}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          onKeyDown={handleEnter}
        ></textarea>

        <div className="edit-options-container" ref={animationRef}>
          <EditPanelTab
            handleClick={() => handleOpen(card)}
            icon={<CgCreditCard />}
          >
            Open card
          </EditPanelTab>

          <span className="minimodal-button" onClick={handleRect}>
            <EditPanelTab
              handleClick={() => handleOpenMiniModal('Move')}
              icon={<ImArrowRight2 />}
            >
              Move
            </EditPanelTab>
          </span>

          <span className="minimodal-button" onClick={handleRect}>
            <EditPanelTab
              handleClick={() => handleOpenMiniModal('Copy')}
              icon={<CgCreditCard />}
            >
              Copy
            </EditPanelTab>
          </span>

          <EditPanelTab
            handleClick={() => setIsWarningDisplayed(true)}
            icon={<ImCross />}
          >
            Delete
          </EditPanelTab>
        </div>

        <button
          className="save-button"
          onClick={() => {
            handleRename();
            dispatch(closeEditPanel());
          }}
        >
          Save
        </button>

        {isMiniModalOpen && editPanelTabRect && (
          <MiniModal rect={editPanelTabRect} />
        )}
      </div>

      {isWarningDisplayed && (
        <WarningModal
          handleDelete={() => handleDelete(card)}
          handleCancel={() => setIsWarningDisplayed(false)}
        >
          Delete card?
        </WarningModal>
      )}
    </Overlay>
  );
};
