import styled from 'styled-components/macro';
import type { ThemeProps } from 'global/Theme';

type CardMoveStyleProps = ThemeProps & {
  rect: DOMRect;
  position: string;
};

export const Container = styled.div<CardMoveStyleProps>`
  position: fixed;
  top: ${({ rect }) =>
    rect.y + 190 < window.innerHeight
      ? `${rect.y + 36}px`
      : `${rect.y - 190}px`};
  left: ${({ rect }) => `${rect.x}px`};
  width: ${({ rect }) => `${rect.width}px`};
  padding: 0 12px 12px;
  background-color: white;
  border-radius: 3px;
  border: 1px solid rgba(0, 0, 0, 0.1);

  @media (min-width: 300px) {
    left: ${({ rect, position }) =>
      position === 'left' ? `${rect.x}px` : `${rect.x + rect.width - 300}px`};
  }

  @media (min-width: 320px) {
    width: 300px;
  }

  z-index: 4;

  h3 {
    position: relative;
    display: block;
    text-align: center;
    font-weight: 400;
    line-height: 40px;
    text-overflow: ellipsis;
    color: #5e6c84;
    margin: 0 12px;
    border-bottom: 1px solid rgba(9, 30, 66, 0.13);
    overflow: hidden;
    white-space: nowrap;
  }

  h4 {
    font-size: 0.875rem;
    font-weight: 600;
    color: #5e6c84;

    margin: 12px 0 6px;
  }

  .icon-container {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    top: 5px;
    right: 5px;
    height: 30px;
    width: 30px;
    cursor: pointer;

    & > svg > path {
      stroke: #6b778c;
      transition: 0.135s;
    }

    &:focus > svg > path,
    &:hover > svg > path {
      stroke: #000;
    }
  }

  .options-container {
    display: flex;
    flex-direction: column;
    gap: 10px;

    @media (min-width: 300px) {
      flex-direction: row;
    }
  }

  .dropdown-container {
    position: relative;
    padding: 8px 10px 30px;
    background-color: rgba(9, 30, 66, 0.06);
    border-radius: 3px;
    height: 50px;

    &.list-dropdown {
      flex: 3;
    }

    &.position-dropdown {
      flex: 1;
    }

    @media (min-width: 300px) {
      padding: 6px 10px 10px;
    }

    .dropdown-label {
      margin-top: -5px;
    }

    .dropdown {
      position: absolute;
      top: 0;
      right: 0;
      left: 0;
      border: 0;
      padding: 27px 0 5px 10px;
      border-radius: 3px;
      background: transparent;
      overflow: hidden;
      text-overflow: ellipsis;
      cursor: pointer;

      -webkit-appearance: none;
      -moz-appearance: none;
      appearance: none;

      &::-ms-expand {
        display: none;
      }

      &:focus {
        outline: none;
      }

      @media (min-width: 300px) {
        padding-bottom: 0;
      }
    }
  }

  button {
    color: #fff;
    background-color: ${({ theme }: { theme: CardMoveStyleProps }) =>
      theme.background.primary};
    border: none;
    box-shadow: none;
    margin-top: 15px;
    padding: 8px 16px;
    cursor: pointer;
    transition: 0.135s;
    position: relative;

    &:focus,
    &:hover {
      background-color: ${({ theme }: { theme: CardMoveStyleProps }) =>
        theme.background.primaryHover};
    }
  }
`;
