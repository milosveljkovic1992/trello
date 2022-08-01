import styled from 'styled-components/macro';

interface Props {
  transitionDuration: number;
  isDisplayed: boolean;
}

export const Snackbar = styled.div<Props>`
  position: fixed;
  bottom: 5px;
  left: 0;
  width: 100%;

  text-align: center;
  padding: 20px 10px;
  background-color: rgba(215, 0, 0, 0.8);
  border-radius: 3px;
  overflow: hidden;
  cursor: pointer;

  transition: ${({ transitionDuration }) => `${transitionDuration}ms`};
  opacity: ${({ isDisplayed }) => (isDisplayed ? 1 : 0)};
  transform: ${({ isDisplayed }) =>
    isDisplayed ? 'translateY(0px)' : 'translateY(30px)'};

  z-index: 3;

  p {
    font-size: 21px;
    line-height: 2rem;
    color: #fff;
    user-select: none;
    word-break: break-word;
  }
`;
