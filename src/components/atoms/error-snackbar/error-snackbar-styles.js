import styled from 'styled-components/macro';

export const Snackbar = styled.div`
  position: fixed;
  bottom: 5px;
  left: calc(50% - 150px);
  min-width: 300px;

  text-align: center;
  padding: 20px 10px;
  background-color: rgba(215, 0, 0, 0.6);
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
