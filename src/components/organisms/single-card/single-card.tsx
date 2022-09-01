import { useEffect, useRef, useState } from 'react';

import { useSelector } from 'react-redux';
import { Draggable } from '@hello-pangea/dnd';

import { TbPencil } from 'react-icons/tb';

import { RootState, useAppDispatch } from 'store';
import { openEditPanel } from 'store/board-slice';

import { Link } from 'components/atoms';
import { SingleCardContent } from 'components/molecules';
import { EditPanel } from 'components/organisms';

import { SingleCardProps } from './single-card.types';
import { Container } from './single-card.styles';

export const SingleCard = ({ card, index }: SingleCardProps) => {
  const dispatch = useAppDispatch();
  const { isEditPanelOpen, editPanelId } = useSelector(
    (state: RootState) => state.board,
  );
  const [rect, setRect] = useState<DOMRect>({} as DOMRect);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isEditPanelOpen && card.id === editPanelId) {
      const boundingClientReact = cardRef.current?.getBoundingClientRect();
      if (boundingClientReact) {
        setRect(boundingClientReact);
      }
    }
  }, [isEditPanelOpen]);

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => {
        return (
          <Container
            className="card-box"
            data-testid="single-card"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            index={index}
          >
            <Link
              to={`c/${card.id}`}
              className="card-link"
              data-testid="single-card-link"
            >
              <SingleCardContent card={card} ref={cardRef} />
            </Link>
            {isEditPanelOpen && card.id === editPanelId && (
              <EditPanel card={card} rect={rect} index={index} />
            )}
            <div
              className="edit-btn"
              onClick={() => dispatch(openEditPanel(card.id))}
              data-testid="edit-button"
            >
              <TbPencil />
            </div>
          </Container>
        );
      }}
    </Draggable>
  );
};
