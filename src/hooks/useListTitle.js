import { useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { archiveList } from 'store/lists-slice';

export const useListTitle = ({ listId, handleTitle }) => {
  const dispatch = useDispatch();
  const [isInputActive, setIsInputActive] = useState(false);

  const titleRef = useRef(null);

  const handleSendToArchive = () => {
    dispatch(archiveList(listId));
  };

  const handleFocus = () => {
    setIsInputActive(true);
    titleRef.current.select();
  };

  const handleBlur = () => {
    handleTitle();
    setIsInputActive(false);
  };

  return {
    isInputActive,
    handleSendToArchive,
    handleFocus,
    handleBlur,
    titleRef,
  };
};
