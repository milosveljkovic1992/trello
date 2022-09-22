import { KeyboardEvent, useEffect, useState, useRef } from 'react';

import { CgCreditCard } from 'react-icons/cg';
import { ImArrowRight2, ImCross } from 'react-icons/im';

import { useAppDispatch } from 'store';
import { closeEditPanel } from 'store/board-slice';

import { EditPanelTab } from 'components/atoms';
import { CardMove } from 'components/organisms';
import { useCardTitle } from 'components/organisms/card-title/useCardTitle';

import { useEditPanel } from './useEditPanel';
import { EditPanelProps } from './edit-panel.types';
import { Overlay } from './edit-panel.styles';

export const EditPanel = ({ card, rect, index }: EditPanelProps) => {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [isMoveOpen, setIsMoveOpen] = useState(false);
  const [tabRect, setTabRect] = useState<DOMRect>();

  const handleCloseMove = () => {
    setIsMoveOpen(false);
  };

  const handleEnter = (e: KeyboardEvent) => {
    if (e.key === 'Enter' || e.code === 'Enter') {
      if (card.name !== title) {
        handleRename();
      }
      dispatch(closeEditPanel());
    }
  };

  const { title, setTitle, handleRename } = useCardTitle({ card });
  const { handleOpen, handleDisplay, handleDelete } = useEditPanel({
    isMoveOpen,
    handleCloseMove,
  });

  const titleRef = useRef<HTMLTextAreaElement>(null);
  const animationRef = useRef<HTMLDivElement>(null);
  const moveRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!isLoading) {
      titleRef.current?.select();
      animationRef.current?.classList.add('card-edit');
    }
    setIsLoading(false);
  }, [isLoading, rect]);

  useEffect(() => {
    if (!isLoading && isMoveOpen) {
      setTabRect(moveRef.current?.getBoundingClientRect());
    }
  }, [isLoading, isMoveOpen]);

  if (isLoading) {
    return <></>;
  }

  return (
    <Overlay
      className="card-edit__overlay"
      onClick={handleDisplay}
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

          <span ref={moveRef}>
            <EditPanelTab
              handleClick={() => setIsMoveOpen((isOpen) => !isOpen)}
              icon={<ImArrowRight2 />}
            >
              Move
            </EditPanelTab>
          </span>

          <EditPanelTab
            handleClick={() => handleDelete(card)}
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

        {isMoveOpen && tabRect && (
          <CardMove
            rect={tabRect}
            card={card}
            handleCloseMove={handleCloseMove}
            index={index}
          />
        )}
      </div>
    </Overlay>
  );
};
