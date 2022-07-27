import { useState, useRef } from 'react';

import { useDispatch } from 'react-redux';
import axios from 'axios';

import { throwError } from 'store/error-slice';

export const useListTitle = ({ oldTitle, listId, listTitle, setListTitle }) => {
  const dispatch = useDispatch();
  const [isInputActive, setIsInputActive] = useState(false);

  const titleRef = useRef(null);

  const submitTitle = async () => {
    try {
      await axios.put(`/1/lists/${listId}?name=${listTitle}`);
    } catch (error) {
      setListTitle(oldTitle);
      dispatch(throwError('Could not update title'));
    }
  };

  const handleFocus = () => {
    setIsInputActive(true);
    titleRef.current.select();
  };

  const handleBlur = () => {
    submitTitle();
    setIsInputActive(false);
  };

  return {
    isInputActive,
    handleFocus,
    handleBlur,
    titleRef,
  };
};
