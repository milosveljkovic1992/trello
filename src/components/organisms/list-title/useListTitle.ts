import { useState } from 'react';

import { useDispatch } from 'react-redux';
import axios from 'axios';

import { throwError } from 'store/error-slice';

import { useListTitleProps } from './useListTitle.types';

export const useListTitle = ({ titleRef, list }: useListTitleProps) => {
  const dispatch = useDispatch();
  const [listTitle, setListTitle] = useState(list.name);

  const [isInputActive, setIsInputActive] = useState(false);

  const submitTitle = async () => {
    if (listTitle !== list.name) {
      try {
        await axios.put(`/1/lists/${list.id}?name=${listTitle}`);
      } catch (error) {
        setListTitle(list.name);
        dispatch(throwError('Could not update title'));
      }
    }
  };

  const handleFocus = () => {
    setIsInputActive(true);
    titleRef.current?.select();
  };

  const handleSubmit = () => {
    submitTitle();
    setIsInputActive(false);
  };

  return {
    isInputActive,
    handleFocus,
    handleSubmit,
    listTitle,
    setListTitle,
  };
};
