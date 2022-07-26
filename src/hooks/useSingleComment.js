import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux/es/exports';

import { deleteComment } from 'store/comments-slice';

export const useSingleComment = ({ comment }) => {
  const dispatch = useDispatch();
  const card = useSelector((state) => state.card.details);

  const [isActive, setIsActive] = useState(false);

  const handleDelete = () => {
    dispatch(deleteComment({ card, comment }));
  };

  return { isActive, setIsActive, handleDelete };
};
