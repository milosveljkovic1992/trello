import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { resetError } from 'store/error-slice';

import { Snackbar } from './error-modal-styles';

export const ErrorModal = () => {
  const dispatch = useDispatch();
  const { errorMessage } = useSelector((state) => state.errorHandler);

  useEffect(() => {
    const counter = setTimeout(() => {
      dispatch(resetError());
    }, 4000);

    return () => {
      clearTimeout(counter);
    };
  }, []);

  return (
    <Snackbar>
      <p>{errorMessage}</p>
    </Snackbar>
  );
};
