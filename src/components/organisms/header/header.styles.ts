import styled from 'styled-components/macro';

type Props = {
  isHomePage: boolean;
};

export const HeaderContainer = styled.header<Props>`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;

  padding: 20px 15px;
  background-image: ${({ isHomePage }) =>
    !isHomePage &&
    'linear-gradient(to bottom, rgba(0, 0, 0, 0.25), transparent)'};

  @media (min-width: 768px) {
    min-height: 5vh;
    padding: 0 15px;
  }

  .board-icon-container {
    height: 33px;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
    background-color: rgba(255, 255, 255, 0.3);
    cursor: pointer;

    & > * {
      font-size: 21px;

      & > path {
        color: #fff;
      }
    }

    &:focus,
    &:hover {
      background-color: rgba(255, 255, 255, 0.6);
    }
  }

  .board-title-container {
    width: calc(100% - 150px);
    height: 33px;
    margin-left: 8px;
    margin-right: 8px;
    display: flex;
    justify-content: center;
    text-overflow: ellipsis;

    @media (min-width: 768px) {
      justify-content: flex-start;
    }
  }

  .board-title {
    font-size: 21px;
    line-height: 1;
    font-weight: bold;
    color: #fff;
    width: fit-content;
    white-space: nowrap;
    overflow: hidden;

    padding: 5px 10px;
    border: 1px solid transparent;
    border-left-width: 2px;
    border-right-width: 2px;
    border-radius: 3px;
    cursor: pointer;
    user-select: none;

    &:focus,
    &:hover {
      background-color: rgba(175, 175, 175, 0.5);
    }
  }

  .board-title-input {
    font-size: 21px;
    line-height: 1;
    text-align: center;
    font-weight: bold;
    color: #fff;
    width: 100%;
    max-width: auto;

    padding: 0 10px;
    background-color: #c7c7c7;
    border: 2px solid transparent;
    border-radius: 3px;

    cursor: pointer;
    outline: none;

    &:focus,
    &:hover {
      background-color: #c7c7c7;
    }

    &:focus {
      border: 2px solid #fff;
    }

    @media (min-width: 768px) {
      width: auto;
      min-width: 300px;
      text-align: left;
    }
  }
`;
