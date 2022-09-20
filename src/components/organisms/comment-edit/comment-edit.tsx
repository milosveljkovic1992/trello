import { useState, useEffect, useRef, ChangeEvent } from 'react';
import { useSelector } from 'react-redux';
import { AiOutlineClose } from 'react-icons/ai';

import { RootState, useAppDispatch } from 'store';
import { editComment } from 'store/comments-slice';
import type { Comment } from 'store/comments-slice';

import { calculateHeight } from 'utils/calculateHeight';

import { CommentEditProps } from './comment-edit.types';
import { Container } from './comment-edit.styles';

export const CommentEdit = ({ comment, handleClose }: CommentEditProps) => {
  const dispatch = useAppDispatch();
  const card = useSelector((state: RootState) => state.card.details);
  const [commentInput, setCommentInput] = useState(comment.data.text);

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleInput = (e: ChangeEvent) => {
    const target = e.target as HTMLTextAreaElement;
    setCommentInput(target.value);

    calculateHeight(inputRef);
  };

  const handleEdit = (comment: Comment, value: string) => {
    dispatch(editComment({ card, id: comment.id, value }));
    handleClose();
  };

  useEffect(() => {
    inputRef.current?.select();
    calculateHeight(inputRef);
  }, []);

  return (
    <Container data-testid="edit-comment">
      <textarea
        ref={inputRef}
        placeholder="Write a comment..."
        value={commentInput}
        onChange={handleInput}
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
          onClick={handleClose}
          data-testid="icon-container"
        >
          <AiOutlineClose />
        </div>
      </div>
    </Container>
  );
};
