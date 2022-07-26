import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { editComment } from 'store/comments-slice';

export const useCommentEdit = ({ comment, isActive, setIsActive }) => {
  const dispatch = useDispatch();
  const card = useSelector((state) => state.card.details);
  const [commentInput, setCommentInput] = useState(comment.data.text);

  const inputRef = useRef();

  const handleEdit = (comment, value) => {
    dispatch(editComment({ card, id: comment.id, value }));
    setIsActive(false);
  };

  useEffect(() => {
    if (isActive) {
      inputRef.current.select();
    }
  }, [isActive]);

  return { commentInput, setCommentInput, handleEdit, inputRef };
};
