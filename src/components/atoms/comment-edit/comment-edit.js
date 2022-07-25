import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AiOutlineClose } from 'react-icons/ai';

import { editComment } from 'store/comments-slice';

import { Container } from './comment-edit-styles';

export const CommentEdit = ({ comment, isActive, setIsActive }) => {
  const dispatch = useDispatch();
  const card = useSelector((state) => state.card.details);
  const [commentInput, setCommentInput] = useState(comment.data.text);

  const inputRef = useRef();

  const handleEdit = (comment, value) => {
    dispatch(editComment({ card, id: comment.id, value, setIsActive }));
    setIsActive(false);
  };

  useEffect(() => {
    if (isActive) {
      inputRef.current.select();
    }
  }, [isActive]);

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
