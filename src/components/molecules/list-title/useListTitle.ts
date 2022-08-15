import { useState, useRef } from 'react';

import { useDispatch } from 'react-redux';
import axios from 'axios';

import { throwError } from 'store/error-slice';

import { ListTitleProps } from './list-title.types';

export const useListTitle = ({
  oldTitle,
  listId,
  listTitle,
  setListTitle,
}: ListTitleProps) => {
  const dispatch = useDispatch();
  const [isInputActive, setIsInputActive] = useState(false);

  const titleRef = useRef<HTMLTextAreaElement>(null);

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
    titleRef.current?.select();
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
