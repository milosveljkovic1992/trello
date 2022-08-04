import { Overlay } from './loading-spinner.styles';

export const LoadingSpinner = () => {
  return (
    <Overlay data-testid="loading-spinner">
      <div className="spinner-circle bigger">
        <div className="spinner-circle smaller">
          <div className="spinner-circle smallest"></div>
        </div>
      </div>
    </Overlay>
  );
};
