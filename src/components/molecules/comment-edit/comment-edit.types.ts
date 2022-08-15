import { Dispatch, SetStateAction } from 'react';
import type { Comment } from 'store/comments-slice';

export interface CommentEditProps {
  comment: Comment;
  isEditActive: boolean;
  setIsEditActive: Dispatch<SetStateAction<boolean>>;
}
