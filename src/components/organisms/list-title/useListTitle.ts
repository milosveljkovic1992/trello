import { ChangeEvent, useState } from 'react';

import axios from 'axios';
import { useAppDispatch } from 'store';

import { archiveList } from 'store/lists-slice';
import { throwError } from 'store/error-slice';

import { useListTitleProps } from './useListTitle.types';

export const useListTitle = ({ titleRef, list }: useListTitleProps) => {
  const dispatch = useAppDispatch();
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

  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setListTitle(e.target.value);
  };

  const handleFocus = () => {
    setIsInputActive(true);
    titleRef.current?.select();
  };

  const handleSubmit = () => {
    submitTitle();
    setIsInputActive(false);
  };

  const handleDelete = () => {
    dispatch(archiveList(list.id));
  };

  return {
    listTitle,
    isInputActive,
    handleInput,
    handleFocus,
    handleSubmit,
    handleDelete,
  };
};
