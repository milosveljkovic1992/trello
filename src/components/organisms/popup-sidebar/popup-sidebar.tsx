import { MouseEvent, useEffect, useRef, useState } from 'react';

import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
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

  const [isMoveOpen, setIsMoveOpen] = useState(false);
  const [tabRect, setTabRect] = useState<DOMRect>();

  const moveRef = useRef<HTMLElement>(null);

  const handleDelete = () => {
    dispatch(deleteCard(card));
    navigate(`/b/${boardId}`);
    dispatch(closeModal());
    dispatch(resetCard());
  };

  const toggleOpenMove = () => {
    setIsMoveOpen((isOpen) => !isOpen);
  };

  const handleCloseMove = () => {
    setIsMoveOpen(false);
  };

  const handleCloseOverlay = (e: MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    const target = e.target as HTMLElement;
    if (target.classList.contains('card-move-overlay')) {
      setIsMoveOpen(false);
    }
  };

  useEffect(() => {
    if (isMoveOpen) {
      setTabRect(moveRef.current?.getBoundingClientRect());
    }
  }, [isMoveOpen]);

  return (
    <Sidebar>
      <h3>Actions</h3>

      <div className="sidebar-button-container">
        <span ref={moveRef}>
          <PopupSidebarButton
            handleClick={toggleOpenMove}
            icon={<ImArrowRight2 />}
          >
            Move
          </PopupSidebarButton>
        </span>

        <PopupSidebarButton handleClick={handleDelete} icon={<ImCross />}>
          Delete
        </PopupSidebarButton>

        {isMoveOpen && tabRect && (
          <span className="card-move-overlay" onClick={handleCloseOverlay}>
            <CardMove
              rect={tabRect}
              card={card}
              handleCloseMove={handleCloseMove}
              index={0}
            />
          </span>
        )}
      </div>
    </Sidebar>
  );
};
