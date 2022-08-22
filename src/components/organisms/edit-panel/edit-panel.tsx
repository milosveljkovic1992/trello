import { useEffect, useState, useRef } from 'react';

import { CgCreditCard } from 'react-icons/cg';
import { ImArrowRight2, ImCross } from 'react-icons/im';

import { useAppDispatch } from 'store';
import { closeEditPanel } from 'store/board-slice';

import { CardMove } from 'components/organisms';
import { useCardTitle } from 'components/atoms/card-title/useCardTitle';

import { useEditPanel } from './useEditPanel';
import { EditPanelProps } from './edit-panel.types';
import { Overlay } from './edit-panel.styles';

export const EditPanel = ({ card, rect, index }: EditPanelProps) => {
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [isMoveOpen, setIsMoveOpen] = useState(false);
  const [tabRect, setTabRect] = useState<DOMRect>();

  const { title, setTitle, handleRename } = useCardTitle({ card });
  const { handleOpen, handleDisplay, handleDelete } = useEditPanel({
    isMoveOpen,
    setIsMoveOpen,
  });

  const titleRef = useRef<HTMLTextAreaElement>(null);
  const animationRef = useRef<HTMLDivElement>(null);
  const moveRef = useRef<HTMLDivElement>(null);

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
        ></textarea>
        <div className="edit-options-container" ref={animationRef}>
          <div className="edit-options-tab" onClick={() => handleOpen(card)}>
            <div className="edit-options-icon-container">
              <CgCreditCard />
            </div>
            <div className="edit-options-tab-label">Open card</div>
          </div>

          <div
            ref={moveRef}
            className="edit-options-tab card-edit__move-button"
            onClick={() => setIsMoveOpen(!isMoveOpen)}
          >
            <div className="edit-options-icon-container">
              <ImArrowRight2 />
            </div>
            <div className="edit-options-tab-label">Move</div>
          </div>

          <div className="edit-options-tab" onClick={() => handleDelete(card)}>
            <div className="edit-options-icon-container">
              <ImCross />
            </div>
            <div className="edit-options-tab-label">Delete</div>
          </div>
        </div>

        <div
          className="save-button"
          onClick={() => {
            handleRename();
            dispatch(closeEditPanel());
          }}
        >
          Save
        </div>

        {isMoveOpen && tabRect && (
          <CardMove
            rect={tabRect}
            card={card}
            setIsMoveOpen={setIsMoveOpen}
            index={index}
          />
        )}
      </div>
    </Overlay>
  );
};
