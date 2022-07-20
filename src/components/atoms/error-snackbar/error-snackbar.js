import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { resetError } from 'store/error-slice';

import { Snackbar } from './error-snackbar-styles';

export const ErrorSnackbar = () => {
  const dispatch = useDispatch();
  const { errorMessage } = useSelector((state) => state.errorHandler);
  const [isDisplayed, setIsDisplayed] = useState(false);

  const displayTime = 4000;
  const transitionDuration = 200;

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(resetError());
    }, displayTime);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    setIsDisplayed(true);
    const timer = setTimeout(() => {
      setIsDisplayed(false);
    }, displayTime - transitionDuration);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  return (
    <Snackbar isDisplayed={isDisplayed} transitionDuration={transitionDuration}>
      <p>{errorMessage}</p>
    </Snackbar>
  );
};
