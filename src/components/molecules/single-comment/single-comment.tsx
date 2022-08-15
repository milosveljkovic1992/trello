import { useState } from 'react';

import { useSelector } from 'react-redux';

import { RootState, useAppDispatch } from 'store';
import { deleteComment } from 'store/comments-slice';
import type { Comment } from 'store/comments-slice';

import { CommentEdit, Link } from 'components/atoms';

import { Container } from './single-comment.styles';

export const SingleComment = ({ comment }: { comment: Comment }) => {
  const dispatch = useAppDispatch();
  const card = useSelector((state: RootState) => state.card.details);

  const [isActive, setIsActive] = useState(false);

  const handleDelete = () => {
    dispatch(deleteComment({ card, comment }));
  };

  return (
    <Container key={comment.id} data-testid="single-comment">
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
                <p onClick={() => handleDelete()}>Delete</p>
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
