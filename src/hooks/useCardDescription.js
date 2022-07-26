import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux/es/exports';

import { editDescription } from 'store/card-slice';

export const useCardDescription = () => {
  const dispatch = useDispatch();
  const card = useSelector((state) => state.card.details);
  const { isLoading } = useSelector((state) => state.card);
  const [description, setDescription] = useState('');
  const [previousDescription, setPreviousDescription] = useState('');
  const [isActive, setIsActive] = useState(false);

  const descRef = useRef(null);

  const handleEdit = () => {
    dispatch(
      editDescription({
        card,
        description,
        setDescription,
        previousDescription,
      }),
    );
  };

  const handleActive = (e) => {
    if (e.target.closest('.desc-btn')) {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  };

  useEffect(() => {
    if (isActive) {
      descRef.current.select();
    }
    setPreviousDescription(description);
  }, [isActive]);

  useEffect(() => {
    if (!isLoading) {
      setDescription(card.desc);
    }
  }, [isLoading, card]);

  return {
    isActive,
    setIsActive,
    description,
    setDescription,
    previousDescription,
    descRef,
    handleActive,
    handleEdit,
  };
};
