import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { RootState, useAppDispatch } from 'store';
import { resetError } from 'store/error-slice';

export const useErrorSnackbar = () => {
  const dispatch = useAppDispatch();
  const { errorMessage } = useSelector(
    (state: RootState) => state.errorHandler,
  );
  const [isDisplayed, setIsDisplayed] = useState(false);

  const displayTime = 4000;
  const transitionDuration = 200;

  useEffect(() => {
    setIsDisplayed(true);

    const resetTimer = setTimeout(() => {
      dispatch(resetError());
    }, displayTime);

    const displayTimer = setTimeout(() => {
      setIsDisplayed(false);
    }, displayTime - transitionDuration);

    return () => {
      clearTimeout(resetTimer);
      clearTimeout(displayTimer);
    };
  }, []);

  return { isDisplayed, errorMessage, transitionDuration };
};
