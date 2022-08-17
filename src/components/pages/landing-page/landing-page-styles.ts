import styled, { StyledComponent } from 'styled-components/macro';
import type { ThemeProps } from 'global/Theme';

export const Container: StyledComponent<
  'div',
  Record<string, unknown>,
  Record<string, unknown>,
  never
> = styled.div<ThemeProps>`
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;

  .inner-container {
    min-height: 500px;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 40px;
  }

  .landing-heading {
    min-height: 50px;
  }

  h2 {
    font-size: 21px;
    text-transform: uppercase;
    user-select: none;
  }

  .boards-container {
    max-width: 830px;
    margin: 0 20px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 20px;

    .single-board-container {
      position: relative;
      overflow: visible;
      background-color: #c7c7c7;
      background-size: cover;
      border-radius: 3px;
    }

    .board {
      width: 150px;
      height: 100px;
      position: relative;
      background-color: transparent;
      padding: 8px 12px;
      border-radius: 3px;
      overflow: hidden;
      cursor: pointer;
      transition: 0.135s;

      &:focus,
      &:hover {
        background-color: rgba(255, 255, 255, 0.25);

        .delete-btn {
          display: flex;
        }
      }
    }

    .board-title {
      word-break: break-word;
      text-overflow: ellipsis;
      padding-top: 2px;
      user-select: none;

      color: #fff;
      font-weight: 700;
      text-shadow: 0 0 3px #000;

      &.isInputActive {
        display: none;
      }
    }

    .delete-container {
      position: absolute;
      top: 10px;
      right: 10px;
      height: 20px;
      width: 20px;
      display: none;
      align-items: center;
      justify-content: center;
      background-color: #fff;
      border-radius: 2px;

      &:focus,
      &:hover {
        background-color: #c7c7c7;
      }
    }
  }

  textarea {
    width: 100%;
    height: 100%;
    font-weight: 600;
    word-break: break-word;

    background-color: transparent;
    padding: 2px 2px 2px 0;
    border: none;
    border-radius: 3px;

    resize: none;

    &.isInputActive {
      display: none;
    }

    &:focus {
      outline: none;
    }

    ::placeholder {
      color: #172b4d;
      font-weight: 700;
    }
  }

  .create-new-button {
    height: 35px;
    position: absolute;
    bottom: -50px;
    left: 0;

    color: #fff;
    background-color: ${({ theme }: { theme: ThemeProps }) =>
      theme.background.primary};
    border: none;
    box-shadow: none;
    padding: 8px 16px;
    border-radius: 3px;
    cursor: pointer;
    transition: 0.135s;
    transform: translateY(-20px);

    &.isInputActive {
      display: none;
    }

    &:focus,
    &:hover {
      background-color: ${({ theme }: { theme: ThemeProps }) =>
        theme.background.primaryHover};
    }

    &.slide-in-top {
      transform: translateY(0);
    }
  }
`;
