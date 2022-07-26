import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { resetError } from 'store/error-slice';

export const useErrorSnackbar = () => {
  const dispatch = useDispatch();
  const { errorMessage } = useSelector((state) => state.errorHandler);
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
