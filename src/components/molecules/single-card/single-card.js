import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { TbPencil } from 'react-icons/tb';
import { HiViewList } from 'react-icons/hi';
import { FaRegComment } from 'react-icons/fa';

import { deleteCard, getCard } from 'store/card-slice';
import { moveCard } from 'store/cards-slice';
import { openModal } from 'store/popup-slice';
import {
  startDrag,
  dragOverCard,
  dragOverList,
  endDrag,
} from 'store/drag-drop-slice';
import { throwError } from 'store/error-slice';

import { Link } from 'components/atoms';
import { EditPanel } from 'components/organisms';

import { Container } from './single-card-styles';

export const SingleCard = ({ index, card, setIsListUpdated }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { draggedCard, targetListId, targetPosition } = useSelector(
    (state) => state.dragDrop,
  );

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isMoveOpen, setIsMoveOpen] = useState(false);
  const [rect, setRect] = useState(null);

  const cardRef = useRef(null);

  const handleOpen = (card) => {
    const { id } = card;
    navigate(`c/${card.id}`);
    setIsEditOpen(false);
    try {
      dispatch(getCard({ id }));
      dispatch(openModal(id));
    } catch (error) {
      dispatch(throwError('Could not open card'));
    }
  };

  const handleDelete = (card) => {
    dispatch(deleteCard(card));
    setIsEditOpen(false);
  };

  const handleMove = (card, targetList, targetPosition) => {
    dispatch(moveCard({ card, targetList, targetPosition, setIsListUpdated }));

    setIsEditOpen(false);
    setIsMoveOpen(false);
  };

  useEffect(() => {
    if (isEditOpen) {
      setRect(cardRef.current.getBoundingClientRect());
    }
  }, [isEditOpen]);

  const handleDragStart = (e, card, index) => {
    const listId = card.idList;
    dispatch(startDrag({ card, index }));
    dispatch(dragOverList({ listId }));
    e.target.classList.add('drag-active');
  };

  const handleDragEnterCard = (e, card, index) => {
    let { pos } = card;
    const isFirst = index === 0;

    if (isFirst) {
      pos = pos / 2;
    } else if (draggedCard.pos > card.pos) {
      pos = pos - 1;
    }

    dispatch(dragOverCard({ index, pos }));
  };

  const handleDragEnd = (e) => {
    dispatch(
      moveCard({
        card: draggedCard,
        targetList: targetListId,
        targetPosition,
        setIsListUpdated,
      }),
    );

    setIsListUpdated(true);
    dispatch(endDrag());

    e.target.classList.remove('drag-active');
  };

  let editPanelProps = {
    rect,
    card,
    setIsEditOpen,
    isMoveOpen,
    setIsMoveOpen,
    handleOpen,
    handleMove,
    handleDelete,
  };

  return (
    <Container ref={cardRef} draggable className="card-box">
      <Link
        to={`c/${card.id}`}
        draggable
        className="card-link"
        onDragStart={(e) => handleDragStart(e, card, index)}
        onDragEnter={(e) => handleDragEnterCard(e, card, index)}
        onDragEnd={(e) => handleDragEnd(e)}
      >
        <div className="card-content-box">
          <p className="card-title">{card.name}</p>
          {(card.badges.description || !!card.badges.comments) && (
            <div className="badges">
              {card.badges.description && (
                <div className="badge-icon-container">
                  <span className="badge-icon">
                    <HiViewList />
                  </span>
                </div>
              )}
              {!!card.badges.comments && (
                <div className="badge-icon-container">
                  <span className="badge-icon">
                    <FaRegComment />
                  </span>
                  <span className="badge-count">{card.badges.comments}</span>
                </div>
              )}
            </div>
          )}
        </div>
      </Link>
      {isEditOpen && (
        <EditPanel editPanelProps={editPanelProps} index={index} />
      )}
      <div className="edit-btn" onClick={() => setIsEditOpen(true)}>
        <TbPencil />
      </div>
    </Container>
  );
};
