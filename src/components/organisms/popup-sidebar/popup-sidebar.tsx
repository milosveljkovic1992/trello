import { MouseEvent, useEffect, useRef, useState } from 'react';

import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { CgCreditCard } from 'react-icons/cg';
import { ImArrowRight2, ImCross } from 'react-icons/im';

import { RootState, useAppDispatch } from 'store';
import { deleteCard, resetCard } from 'store/card-slice';
import { closeModal } from 'store/popup-slice';

import { PopupSidebarButton } from 'components/atoms';
import { CardMove } from 'components/organisms';

import { Sidebar } from './popup-sidebar.styles';

export const PopupSidebar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const urlParams = useParams();
  const { boardId } = urlParams;

  const card = useSelector((state: RootState) => state.card.details);

  const [isMoveTabOpen, setIsMoveTabOpen] = useState(false);
  const [isCopyTabOpen, setIsCopyTabOpen] = useState(false);
  const [moveTabRect, setMoveTabRect] = useState<DOMRect>();
  const [copyTabRect, setCopyTabRect] = useState<DOMRect>();

  const moveRef = useRef<HTMLElement>(null);
  const copyRef = useRef<HTMLElement>(null);

  const handleDelete = () => {
    dispatch(deleteCard(card));
    navigate(`/b/${boardId}`);
    dispatch(closeModal());
    dispatch(resetCard());
  };

  const handleCloseMove = () => {
    setIsMoveTabOpen(false);
  };

  const handleCloseCopy = () => {
    setIsCopyTabOpen(false);
  };

  const closeTab = () => {
    if (isMoveTabOpen) {
      setIsMoveTabOpen(false);
      setMoveTabRect(undefined);
    }
    if (isCopyTabOpen) {
      setIsCopyTabOpen(false);
      setCopyTabRect(undefined);
    }
  };

  const handleCloseOverlay = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    const target = e.target as HTMLElement;
    if (target.classList.contains('card-move-overlay')) closeTab();
  };

  useEffect(() => {
    if (isMoveTabOpen) {
      setMoveTabRect(moveRef.current?.getBoundingClientRect());
    }
    if (isCopyTabOpen) {
      setCopyTabRect(copyRef.current?.getBoundingClientRect());
    }
  }, [isMoveTabOpen, isCopyTabOpen]);

  return (
    <Sidebar>
      <h3>Actions</h3>

      <div className="sidebar-button-container">
        <span ref={moveRef}>
          <PopupSidebarButton
            handleClick={() => setIsMoveTabOpen(true)}
            icon={<ImArrowRight2 />}
          >
            Move
          </PopupSidebarButton>
        </span>

        <span ref={copyRef}>
          <PopupSidebarButton
            handleClick={() => setIsCopyTabOpen(true)}
            icon={<CgCreditCard />}
          >
            Copy
          </PopupSidebarButton>
        </span>

        <PopupSidebarButton handleClick={handleDelete} icon={<ImCross />}>
          Delete
        </PopupSidebarButton>

        {(isMoveTabOpen || isCopyTabOpen) && (
          <span className="card-move-overlay" onClick={handleCloseOverlay}>
            {moveTabRect && (
              <CardMove
                rect={moveTabRect}
                card={card}
                handleClosePanel={handleCloseMove}
                index={0}
              >
                Move
              </CardMove>
            )}

            {copyTabRect && (
              <CardMove
                rect={copyTabRect}
                card={card}
                handleClosePanel={handleCloseCopy}
                index={0}
              >
                Copy
              </CardMove>
            )}
          </span>
        )}
      </div>
    </Sidebar>
  );
};
