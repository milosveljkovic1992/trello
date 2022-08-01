import { useErrorSnackbar } from 'hooks/useErrorSnackbar';

import { Snackbar } from './error-snackbar.styles';

export const ErrorSnackbar = () => {
  const { isDisplayed, errorMessage, transitionDuration } = useErrorSnackbar();

  return (
    <Snackbar isDisplayed={isDisplayed} transitionDuration={transitionDuration}>
      <p>{errorMessage}</p>
    </Snackbar>
  );
};
