import { TbPencil } from 'react-icons/tb';
import { HiViewList } from 'react-icons/hi';
import { FaRegComment } from 'react-icons/fa';
import { Draggable } from 'react-beautiful-dnd';

import { Link } from 'components/atoms';
import { EditPanel } from 'components/organisms';

import { useSingleCard } from './useSingleCard';
import { SingleCardProps } from './single-card.types';
import { Container } from './single-card.styles';

export const SingleCard = ({
  index,
  card,
  setIsListUpdated,
}: SingleCardProps) => {
  const editPanelProps = useSingleCard({ setIsListUpdated, card });

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
              <div className="card-content-box" ref={editPanelProps.cardRef}>
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
            {editPanelProps.isEditOpen && (
              <EditPanel editPanelProps={editPanelProps} index={index} />
            )}
            <div
              className="edit-btn"
              onClick={() => editPanelProps.setIsEditOpen(true)}
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
