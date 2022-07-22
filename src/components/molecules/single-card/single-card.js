import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import { TbPencil } from 'react-icons/tb';

import { getCard, renameCard } from 'store/card-slice';
import { updateCard } from 'store/cards-slice';
import { informListUpdate } from 'store/lists-slice';
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
  const [title, setTitle] = useState(card.name);
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

  const handleRename = (card, title) => {
    const { id, idList } = card;
    if (title.trim().length > 0) {
      try {
        dispatch(renameCard({ id, title, idList }));
      } catch (error) {
        dispatch(throwError('Could not rename card'));
      }
    } else {
      setTitle(card.name);
      dispatch(throwError('Card name cannot be empty'));
    }

    setIsEditOpen(false);
  };

  // const handleDelete = (card) => {
  //   const { id } = card;
  //   try {
  //     dispatch(deleteCard({ id }));
  //     const remainingCards = cards.filter((card) => card.id !== id);
  //     setCards(remainingCards);
  //   } catch (error) {
  //     dispatch(throwError('Could not delete card'));
  //   }
  // };
  const handleDelete = () => {};

  const handleMove = (card, targetList, targetPosition) => {
    const sendMoveRequest = async () => {
      try {
        const response = await axios.put(
          `/1/cards/${card.id}?idList=${targetList}&pos=${targetPosition}`,
        );
        dispatch(updateCard(response.data));
        setIsListUpdated(true);
        dispatch(informListUpdate(targetList));
      } catch (error) {
        dispatch(throwError('Could not move card'));
      }
    };

    sendMoveRequest();
    setIsEditOpen(false);
    setIsMoveOpen(false);
    // dispatch(informListUpdate(card.idList));
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
    const sendMoveRequest = async () => {
      try {
        const response = await axios.put(
          `/1/cards/${draggedCard.id}?idList=${targetListId}&pos=${targetPosition}`,
        );
        dispatch(updateCard(response.data));
        setIsListUpdated(true);
        dispatch(informListUpdate(targetListId));
      } catch (error) {
        dispatch(throwError('Could not move card'));
      }
    };

    sendMoveRequest();
    setIsListUpdated(true);
    dispatch(endDrag());
    // dispatch(informListUpdate(draggedCard));

    e.target.classList.remove('drag-active');
  };

  let editPanelProps = {
    rect,
    card,
    title,
    setTitle,
    setIsEditOpen,
    isMoveOpen,
    setIsMoveOpen,
    handleOpen,
    handleRename,
    handleMove,
    handleDelete,
  };

  return (
    <Container ref={cardRef} draggable>
      <Link
        to={`c/${card.id}`}
        draggable
        onDragStart={(e) => handleDragStart(e, card, index)}
        onDragEnter={(e) => handleDragEnterCard(e, card, index)}
        onDragEnd={(e) => handleDragEnd(e)}
      >
        <p className="card-title">{card.name}</p>
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
