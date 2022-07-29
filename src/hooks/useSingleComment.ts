import { useState } from 'react';
import { useSelector } from 'react-redux/es/exports';
import { RootState, useAppDispatch } from 'store';
import { deleteComment } from 'store/comments-slice';
import type { Comment } from 'store/comments-slice';

export const useSingleComment = ({ comment }: { comment: Comment }) => {
  const dispatch = useAppDispatch();
  const card = useSelector((state: RootState) => state.card.details);

  const [isActive, setIsActive] = useState(false);

  const handleDelete = () => {
    dispatch(deleteComment({ card, comment }));
  };

  return { isActive, setIsActive, handleDelete };
};
