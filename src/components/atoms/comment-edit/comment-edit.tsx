import { Dispatch, SetStateAction } from 'react';
import { AiOutlineClose } from 'react-icons/ai';

import { useCommentEdit } from 'hooks/useCommentEdit';
import type { Comment } from 'store/comments-slice';

import { Container } from './comment-edit.styles';

interface Props {
  comment: Comment;
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
}

export const CommentEdit = ({ comment, isActive, setIsActive }: Props) => {
  const { commentInput, setCommentInput, handleEdit, inputRef } =
    useCommentEdit({ comment, isActive, setIsActive });

  return (
    <Container>
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

        <div className="icon-container" onClick={() => setIsActive(false)}>
          <AiOutlineClose />
        </div>
      </div>
    </Container>
  );
};
