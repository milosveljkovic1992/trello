import { ChangeEvent, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState, useAppDispatch } from 'store';
import { submitComment } from 'store/comments-slice';
import type { CardType } from 'store/card-slice';

import { calculateHeight } from 'utils/calculateHeight';

import { Comment } from './comment-input.styles';

export const CommentInput = () => {
  const dispatch = useAppDispatch();
  const card: CardType = useSelector((state: RootState) => state.card.details);

  const [comment, setComment] = useState('');
  const [isDisplayed, setIsDisplayed] = useState(false);

  const commentRef = useRef<HTMLTextAreaElement>(null);

  const handleChange = (e: ChangeEvent) => {
    const target = e.target as HTMLTextAreaElement;
    setComment(target.value);

    calculateHeight(commentRef, 41);
  };

  const handleSubmit = () => {
    dispatch(submitComment({ card, comment }));
    setComment('');
    setIsDisplayed(false);
    calculateHeight(commentRef, 41, true);
  };

  return (
    <Comment isDisplayed={isDisplayed} data-testid="input-comment">
      <textarea
        ref={commentRef}
        placeholder="Write a comment..."
        value={comment}
        onChange={handleChange}
        onFocus={() => setIsDisplayed(true)}
        onBlur={() => !comment && setIsDisplayed(false)}
      ></textarea>
      <button disabled={!comment} onClick={handleSubmit}>
        Save
      </button>
    </Comment>
  );
};
