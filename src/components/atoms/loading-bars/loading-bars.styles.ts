import styled, { keyframes } from 'styled-components';

const dance1 = keyframes`
  0% {
    height: 0px;
  }
  50% {
    height: 24px;
  }
  100% {
    height: 0px;
  }
  `;

const dance2 = keyframes`
    0% {
      height: 24px;
    }
    50% {
      height: 0px;
    }
    100% {
      height: 24px;
    }
  `;

const dance3 = keyframes`
  0% {
    height: 12px;
  }
  25% {
    height: 24px;
  }
  50% {
    height: 12px;
  }
  75% {
    height: 0px
  }
  100% {
    height: 12px;
  }
`;

const dance4 = keyframes`
  0% {
    height: 12px;
  }
  25% {
    height: 0px;
  }
  50% {
    height: 12px;
  }
  75% {
    height: 24px
  }
  100% {
    height: 12px;
  }
`;

export const LoadingBarsContainer = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;

  background-color: rgba(215, 215, 215, 0.5);

  .loading-bar-box {
    height: 24px;
    display: flex;
    flex-align: row;
    gap: 3px;

    & > * {
      animation: 0.65s linear infinite;
      background-color: rgba(125, 125, 125, 1);
      width: 3px;
    }
    .first-bar {
      animation-name: ${dance1};
    }

    .second-bar {
      animation-name: ${dance2};
    }

    .third-bar {
      animation-name: ${dance3};
    }

    .fourth-bar {
      animation-name: ${dance4};
    }
  }
`;
