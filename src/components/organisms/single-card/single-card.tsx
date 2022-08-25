import { useEffect, useRef, useState } from 'react';

import { useSelector } from 'react-redux';
import { Draggable } from 'react-beautiful-dnd';

import { TbPencil } from 'react-icons/tb';
import { HiViewList } from 'react-icons/hi';
import { FaRegComment } from 'react-icons/fa';

import { RootState, useAppDispatch } from 'store';
import { openEditPanel } from 'store/board-slice';

import { Link } from 'components/atoms';
import { EditPanel } from 'components/organisms';

import { SingleCardProps } from './single-card.types';
import { Container } from './single-card.styles';

export const SingleCard = ({ index, card }: SingleCardProps) => {
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
          >
            <Link
              to={`c/${card.id}`}
              className="card-link"
              data-testid="single-card-link"
            >
              <div className="card-content-box" ref={cardRef}>
                <p className="card-title">{card.name}</p>
                {(card.badges.description || !!card.badges.comments) && (
                  <div className="badges" data-testid="card-badges">
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
                        <span className="badge-count">
                          {card.badges.comments}
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>
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
