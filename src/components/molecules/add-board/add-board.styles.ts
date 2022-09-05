import styled from 'styled-components/macro';
import { Container as BoardCardContainer } from 'components/molecules/board-card/board-card.styles';

import type { ThemeProps } from 'global/Theme';

export const Container = styled(BoardCardContainer)`
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
