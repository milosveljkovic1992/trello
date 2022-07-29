import { LoadingBarsContainer } from './loading-bars.styles';

export const LoadingBars = () => {
  return (
    <LoadingBarsContainer>
      <div className="loading-bar-box">
        <div className="first-bar"></div>
        <div className="second-bar"></div>
        <div className="third-bar"></div>
        <div className="fourth-bar"></div>
      </div>
    </LoadingBarsContainer>
  );
};
