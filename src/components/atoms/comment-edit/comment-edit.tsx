import { AiOutlineClose } from 'react-icons/ai';

import { useCommentEdit } from 'hooks/useCommentEdit';

import { CommentEditProps } from './comment-edit.types';
import { Container } from './comment-edit.styles';

export const CommentEdit = ({
  comment,
  isActive,
  setIsActive,
}: CommentEditProps) => {
  const { commentInput, setCommentInput, handleEdit, inputRef } =
    useCommentEdit({ comment, isActive, setIsActive });

  return (
    <Container data-testid="edit-comment">
      <textarea
        ref={inputRef}
        placeholder="Write a comment..."
        value={commentInput}
        onChange={(e) => setCommentInput(e.target.value)}
      ></textarea>

      <div className="btn-container">
        <button
          disabled={!commentInput}
          onClick={() => handleEdit(comment, commentInput)}
        >
          Save
        </button>

        <div
          className="icon-container"
          onClick={() => setIsActive(false)}
          data-testid="icon-container"
        >
          <AiOutlineClose />
        </div>
      </div>
    </Container>
  );
};
