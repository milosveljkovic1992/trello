import { useSingleComment } from 'hooks/useSingleComment';

import { Link } from 'components/atoms';
import { CommentEdit } from 'components/atoms';
import type { Comment } from 'store/comments-slice';

import { Container } from './single-comment.styles';

export const SingleComment = ({ comment }: { comment: Comment }) => {
  const { isActive, setIsActive, handleDelete } = useSingleComment({ comment });

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
