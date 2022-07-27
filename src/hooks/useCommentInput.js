import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { submitComment } from 'store/comments-slice';

export const useCommentInput = () => {
  const dispatch = useDispatch();
  const card = useSelector((state) => state.card.details);

  const [comment, setComment] = useState('');
  const [isDisplayed, setIsDisplayed] = useState(false);

  const handleSubmit = () => {
    if (comment.trim().length > 0) {
      dispatch(submitComment({ card, comment }));
    }
    setComment('');
    setIsDisplayed(false);
  };

  return { isDisplayed, setIsDisplayed, comment, setComment, handleSubmit };
};
