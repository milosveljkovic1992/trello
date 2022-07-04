import styled, { keyframes } from 'styled-components/macro';

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const Container = styled.div`
    position: fixed;
    top: 0; right: 0; bottom: 0; left: 0;
    display: flex;
    align-items: center;
    justify-content: center;

    .spinner-circle {
      border: 2px solid #000;
      border-radius: 50%;
      border-right-color: transparent;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .bigger {
      height: 100px;
      width: 100px;

      animation: ${spin} 3s linear infinite;
    };

    .smaller {
      height: 75px;
      width: 75px;

      animation: ${spin} 3s linear infinite;
    };

    .smallest {
      height: 50px;
      width: 50px;

      animation: ${spin} 1s linear infinite;
    }
`;