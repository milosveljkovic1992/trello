import { useState } from 'react';

import { useSelector } from 'react-redux';

import { RootState, useAppDispatch } from 'store';
import { submitComment } from 'store/comments-slice';
import type { CardType } from 'store/card-slice';

export const useCommentInput = () => {
  const dispatch = useAppDispatch();
  const card: CardType = useSelector((state: RootState) => state.card.details);

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
