import { useCommentInput } from 'hooks/useCommentInput';

import { Container } from './comment-input-styles';

export const CommentInput = () => {
  const { isDisplayed, setIsDisplayed, comment, setComment, handleSubmit } =
    useCommentInput();

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
