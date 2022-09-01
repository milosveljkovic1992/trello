import type { Comment } from 'store/comments-slice';

export interface CommentEditProps {
  comment: Comment;
  handleClose: () => void;
}
