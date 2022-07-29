import { useState, useEffect, useRef, Dispatch, SetStateAction } from 'react';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from 'store';

import { editComment } from 'store/comments-slice';
import type { Comment } from 'store/comments-slice';

interface Props {
  comment: Comment;
  isActive: boolean;
  setIsActive: Dispatch<SetStateAction<boolean>>;
}

export const useCommentEdit = ({ comment, isActive, setIsActive }: Props) => {
  const dispatch = useAppDispatch();
  const card = useSelector((state: RootState) => state.card.details);
  const [commentInput, setCommentInput] = useState(comment.data.text);

  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleEdit = (comment: Comment, value: string) => {
    dispatch(editComment({ card, id: comment.id, value }));
    setIsActive(false);
  };

  useEffect(() => {
    if (isActive) {
      inputRef.current?.select();
    }
  }, [isActive]);

  return { commentInput, setCommentInput, handleEdit, inputRef };
};
