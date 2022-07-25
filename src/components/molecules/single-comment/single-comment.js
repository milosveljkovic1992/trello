import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux/es/exports';

import axios from 'axios';

import { throwError } from 'store/error-slice';
import { deleteComment } from 'store/comments-slice';

import { Link } from 'components/atoms';
import { CommentEdit } from 'components/atoms';

import { Container } from './single-comment-styles';
import { updateCard } from 'store/cards-slice';
import { informListUpdate } from 'store/lists-slice';

export const SingleComment = ({ comment }) => {
  const dispatch = useDispatch();
  const card = useSelector((state) => state.card.details);

  const [isActive, setIsActive] = useState(false);

  const handleDelete = () => {
    const deleteRequest = async () => {
      try {
        await axios.delete(
          `/1/cards/${card.id}/actions/${comment.id}/comments`,
        );
        dispatch(deleteComment(comment));

        const updatedCard = await axios.get(`/1/cards/${card.id}`);
        dispatch(updateCard(updatedCard.data));

        dispatch(informListUpdate(card.idList));
      } catch (error) {
        dispatch(throwError('Could not delete comment'));
      }
    };
    deleteRequest();
  };

  return (
    <Container key={comment.id}>
      <div className="comment-avatar"></div>

      <div className="inner">
        <div className="details">
          <div className="username">{comment.memberCreator.fullName}</div>

          <Link to={`#comment-${comment.id}`}>
            <p className="timestamp">
              {`${new Date(comment.date).toLocaleDateString(
                'sr-RS',
              )} at ${new Date(comment.date).toLocaleTimeString('sr-RS')} `}
            </p>
          </Link>

          {!isActive ? (
            <>
              <div className="text-container">
                <p>{comment.data.text}</p>
              </div>
              <div className="actions">
                <p onClick={() => setIsActive(true)}>Edit</p>
                {` - `}
                <p onClick={() => handleDelete(comment.id)}>Delete</p>
              </div>
            </>
          ) : (
            <CommentEdit
              comment={comment}
              isActive={isActive}
              setIsActive={setIsActive}
            />
          )}
        </div>
      </div>
    </Container>
  );
};
