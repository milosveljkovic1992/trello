import { useEffect, useState, useRef } from 'react';

import { CgCreditCard } from 'react-icons/cg';
import { ImArrowRight2, ImCross } from 'react-icons/im';

import { CardMove } from 'components/organisms';
import { Overlay } from './edit-panel-styles';
import { useCardTitle } from 'hooks/useCardTitle';

export const EditPanel = ({ editPanelProps, index }) => {
  const {
    rect,
    card,
    handleOpen,
    handleMove,
    handleDelete,
    setIsEditOpen,
    isMoveOpen,
    setIsMoveOpen,
  } = editPanelProps;
  const [isLoading, setIsLoading] = useState(true);
  const [tabRect, setTabRect] = useState(null);
  const { title, setTitle, handleRename } = useCardTitle({ card });

  const titleRef = useRef();
  const animationRef = useRef();
  const moveRef = useRef();

  const handleDisplay = (e) => {
    if (e.target.classList.contains('card-edit__overlay')) {
      isMoveOpen ? setIsMoveOpen(false) : setIsEditOpen(false);
    }
  };

  useEffect(() => {
    if (!isLoading) {
      titleRef.current.select();
      animationRef.current.classList.add('card-edit');
    }
    setIsLoading(false);
  }, [isLoading, rect]);

  useEffect(() => {
    if (!isLoading && isMoveOpen) {
      setTabRect(moveRef.current.getBoundingClientRect());
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
          onClick={() => handleRename(setIsEditOpen)}
        >
          Save
        </div>

        {isMoveOpen && tabRect && (
          <CardMove
            rect={tabRect}
            card={card}
            setIsMoveOpen={setIsMoveOpen}
            handleMove={handleMove}
            index={index}
          />
        )}
      </div>
    </Overlay>
  );
};
