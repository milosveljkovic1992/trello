import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import axios from 'axios';

import { informListUpdate } from 'store/lists-slice';
import { throwError } from 'store/error-slice';

import { Container } from './comment-input-styles';
import { updateCard } from 'store/cards-slice';

export const CommentInput = ({ setIsUpdated }) => {
  const dispatch = useDispatch();
  const card = useSelector((state) => state.card.details);

  const [comment, setComment] = useState('');
  const [isDisplayed, setIsDisplayed] = useState(false);

  const handleSubmit = () => {
    const postComment = async () => {
      try {
        await axios.post(
          `/1/cards/${card.id}/actions/comments?text=${comment}`,
        );

        const updatedCard = await axios.get(`/1/cards/${card.id}`);
        dispatch(updateCard(updatedCard.data));

        dispatch(informListUpdate(card.idList));
        setIsUpdated(true);
      } catch (error) {
        dispatch(throwError('Comment could not be added'));
      }
    };

    if (comment.trim().length > 0) {
      postComment();
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
