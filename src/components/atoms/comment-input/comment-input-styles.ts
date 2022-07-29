import styled from 'styled-components/macro';

interface Props {
  isDisplayed: boolean;
}

export const Comment = styled.div<Props>`
  width: 100%;
  border-radius: 3px;
  height: 100%;
  min-height: 40px;
  background: #fff;
  margin-bottom: 10px;
  padding: 8px 10px;

  padding-bottom: ${({ isDisplayed }) => (isDisplayed ? '40px' : 0)};
  transition: 0.1s;

  textarea {
    width: 100%;
    margin-bottom: -3px;
    border: 0;
    resize: none;

    &:focus {
      outline: none;
    }
  }

  button {
    background-color: #0079bf;
    color: #fff;
    border: none;
    box-shadow: none;
    padding: 6px 12px;
    cursor: pointer;

    &:focus,
    &:hover {
      background-color: #026aa7;
    }

    &:disabled {
      color: #a5adba;
      background-color: rgba(9, 30, 66, 0.04);
      cursor: not-allowed;
    }

    position: absolute;
    opacity: ${({ isDisplayed }) => (isDisplayed ? 1 : 0)};
    visibility: ${({ isDisplayed }) => (isDisplayed ? 'visible' : 'hidden')};
    bottom: 18px;
    left: 12px;

    transition: 0.1s;
  }
`;
