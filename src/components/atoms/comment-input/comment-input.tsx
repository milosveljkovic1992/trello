import { useCommentInput } from 'hooks/useCommentInput';

import { Comment } from './comment-input.styles';

export const CommentInput = () => {
  const { isDisplayed, setIsDisplayed, comment, setComment, handleSubmit } =
    useCommentInput();

  return (
    <Comment isDisplayed={isDisplayed}>
      <textarea
        placeholder="Write a comment..."
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        onFocus={() => setIsDisplayed(true)}
        onBlur={() => !comment && setIsDisplayed(false)}
      ></textarea>
      <button disabled={!comment} onClick={() => handleSubmit()}>
        Save
      </button>
    </Comment>
  );
};
