import { useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState, useAppDispatch } from 'store';
import { submitComment } from 'store/comments-slice';
import type { CardType } from 'store/card-slice';

import { Comment } from './comment-input.styles';

export const CommentInput = () => {
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

  return (
    <Comment isDisplayed={isDisplayed} data-testid="input-comment">
      <textarea
        placeholder="Write a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        onFocus={() => setIsDisplayed(true)}
        onBlur={() => !comment && setIsDisplayed(false)}
      ></textarea>
      <button disabled={!comment} onClick={handleSubmit}>
        Save
      </button>
    </Comment>
  );
};
