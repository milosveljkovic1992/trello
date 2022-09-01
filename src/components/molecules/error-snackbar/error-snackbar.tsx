import { useEffect, useState } from 'react';

import { ErrorSnackbarProps } from './error-snackbar.types';
import { Snackbar } from './error-snackbar.styles';

export const ErrorSnackbar = ({
  errorMessage,
  handleErrorReset,
}: ErrorSnackbarProps) => {
  const [isDisplayed, setIsDisplayed] = useState(false);

  const displayTime = 4000;
  const transitionDuration = 200;

  useEffect(() => {
    setIsDisplayed(true);

    const resetTimer = setTimeout(() => {
      handleErrorReset();
    }, displayTime);

    const displayTimer = setTimeout(() => {
      setIsDisplayed(false);
    }, displayTime - transitionDuration);

    return () => {
      clearTimeout(resetTimer);
      clearTimeout(displayTimer);
    };
  }, []);

  return (
    <Snackbar
      isDisplayed={isDisplayed}
      transitionDuration={transitionDuration}
      data-testid="error-snackbar"
    >
      <p>{errorMessage}</p>
    </Snackbar>
  );
};
