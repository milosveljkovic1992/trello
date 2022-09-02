import styled, { keyframes } from 'styled-components/macro';

const pulse1 = keyframes`
  0% {
    height: 0%
  }
  50% {
    height: 100%
  }
  100% {
    height: 0%
  }
`;
const pulse2 = keyframes`
  0% {
    height: 25%
  }
  37.5% {
    height: 100%
  }
  87.5% {
    height: 0%
  }
  100% {
    height: 25%
  }
`;
const pulse3 = keyframes`
  0% {
    height: 50%
  }
  25% {
    height: 100%
  }
  75% {
    height: 0%
  }
  100% {
    height: 50%
  }
`;
const pulse4 = keyframes`
  0% {
    height: 75%
  }
  12.5% {
    height: 100%
  }
  62.5% {
    height: 0%
  }
  100% {
    height: 75%
  }
`;
const pulse5 = keyframes`
  0% {
    height: 100%
  }
  50% {
    height: 0%
  }
  100% {
    height: 100%
  }
`;

export const Overlay = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  background-color: rgba(77, 77, 77, 0.3);
  z-index: 3;

  .pulse-container {
    width: 250px;
    height: 120px;
    padding: 20px 0;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: 5px;

    display: flex;
    align-items: center;
    justify-content: center;
    gap: 2px;

    .pulse-bar {
      display: block;
      width: 2px;
      background-color: black;

      animation: 0.5s linear infinite;
    }

    .pulse-bar-one {
      animation-name: ${pulse1};
    }

    .pulse-bar-two {
      animation-name: ${pulse2};
    }

    .pulse-bar-three {
      animation-name: ${pulse3};
    }

    .pulse-bar-four {
      animation-name: ${pulse4};
    }

    .pulse-bar-five {
      animation-name: ${pulse5};
    }
  }
`;
