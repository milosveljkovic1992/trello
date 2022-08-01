import { useState, useEffect, useRef, MouseEvent } from 'react';
import { useSelector } from 'react-redux/es/exports';

import { RootState, useAppDispatch } from 'store';
import { editDescription } from 'store/card-slice';

export const useCardDescription = () => {
  const dispatch = useAppDispatch();
  const card = useSelector((state: RootState) => state.card.details);
  const { isLoading } = useSelector((state: RootState) => state.card);
  const [description, setDescription] = useState('');
  const [previousDescription, setPreviousDescription] = useState('');
  const [isActive, setIsActive] = useState(false);

  const descRef = useRef<HTMLTextAreaElement>(null);

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

  const handleActive = (e: MouseEvent<HTMLDivElement>) => {
    const target = e.target as Element;
    if (target.closest('.desc-btn')) {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  };

  useEffect(() => {
    if (isActive) {
      descRef.current?.select();
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
