import { Dispatch, SetStateAction } from 'react';
import type { Comment } from 'store/comments-slice';

export interface CommentEditProps {
  comment: Comment;
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
}
