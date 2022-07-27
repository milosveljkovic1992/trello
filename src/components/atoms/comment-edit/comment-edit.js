import { AiOutlineClose } from 'react-icons/ai';

import { useCommentEdit } from 'hooks/useCommentEdit';

import { Comment } from './comment-edit-styles';

export const CommentEdit = ({ comment, isActive, setIsActive }) => {
  const { commentInput, setCommentInput, handleEdit, inputRef } =
    useCommentEdit({ comment, isActive, setIsActive });

  return (
    <Comment>
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
    </Comment>
  );
};
