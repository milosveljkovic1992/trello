import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Container } from './comment-input-styles';
import { submitComment } from 'store/comments-slice';
import { resetUpdate } from 'store/popup-slice';

export const CommentInput = () => {
  const dispatch = useDispatch();
  const card = useSelector((state) => state.card.details);

  const [comment, setComment] = useState('');
  const [isDisplayed, setIsDisplayed] = useState(false);

  const handleSubmit = () => {
    if (comment.trim().length > 0) {
      dispatch(submitComment({ card, comment }));
      dispatch(resetUpdate());
    }
    setComment('');
    setIsDisplayed(false);
  };

  return (
    <Container isDisplayed={isDisplayed}>
      <textarea
        placeholder="Write a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        onFocus={() => setIsDisplayed(true)}
        onBlur={() => !comment && setIsDisplayed(false)}
      ></textarea>
      <button
        disabled={!comment}
        onClick={() => handleSubmit(comment, setComment)}
      >
        Save
      </button>
    </Container>
  );
};
