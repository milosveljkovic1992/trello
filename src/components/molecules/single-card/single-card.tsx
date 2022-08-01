import { TbPencil } from 'react-icons/tb';
import { HiViewList } from 'react-icons/hi';
import { FaRegComment } from 'react-icons/fa';

import { Link } from 'components/atoms';
import { EditPanel } from 'components/organisms';

import { useDragAndDrop } from 'hooks/useDragAndDrop';
import { useSingleCard } from 'hooks/useSingleCard';

import { SingleCardProps } from './single-card.types';
import { Container } from './single-card.styles';

export const SingleCard = ({
  index,
  card,
  setIsListUpdated,
}: SingleCardProps) => {
  const { handleDragStart, handleDragEnterCard, handleDragEnd } =
    useDragAndDrop({ setIsListUpdated });

  const editPanelProps = useSingleCard({ setIsListUpdated, card });

  return (
    <Container ref={editPanelProps.cardRef} draggable className="card-box">
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
      {editPanelProps.isEditOpen && (
        <EditPanel editPanelProps={editPanelProps} index={index} />
      )}
      <div
        className="edit-btn"
        onClick={() => editPanelProps.setIsEditOpen(true)}
      >
        <TbPencil />
      </div>
    </Container>
  );
};
