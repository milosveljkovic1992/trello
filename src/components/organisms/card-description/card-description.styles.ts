import styled from 'styled-components/macro';
import type { ThemeProps } from 'global/Theme';

type CardDescriptionStyleProps = ThemeProps & {
  hasDescription: boolean;
  isActive: boolean;
};
export const Container = styled.div<CardDescriptionStyleProps>`
  background-color: rgba(9, 30, 66, 0.04);
  min-height: ${({ hasDescription }) => !hasDescription && '70px'};
  position: relative;
  border-radius: 3px;
  padding-bottom: ${({ isActive }) => (isActive ? '50px' : 0)};
  background-color: ${({ hasDescription, isActive }) =>
    isActive || hasDescription
      ? 'rgba(9, 30, 66, 0)'
      : 'rgba(9, 30, 66, 0.04)'};

  .btn-container {
    box-shadow: none;
    position: relative;
    display: flex;
    gap: 10px;

    button {
      background-color: #0079bf;
      color: #fff;
      border: none;
      padding: 6px 12px;

      transition: 0.1s;

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
    }
  }

  .desc-content {
    padding: 8px 12px;
    cursor: pointer;
    padding-left: ${({ hasDescription }) => hasDescription && 0};
  }

  .desc-input {
    display: block;
    min-height: 71px;
    width: 100%;
    padding: 8px 12px;
    border: none;
    border-radius: 3px;
    resize: none;
    overflow-y: hidden;

    &:focus {
      outline: 1px solid #c7c7c7;
    }
  }

  .icon-container {
    position: absolute;
    left: 0;
    bottom: 6px;
  }

  .close-icon-container {
    padding: 6px;
    display: flex;
    align-items: center;
    border-radius: ${({ theme }: { theme: CardDescriptionStyleProps }) =>
      theme.border.borderRadius};
    cursor: pointer;

    &:focus,
    &:hover {
      background-color: ${({ theme }: { theme: CardDescriptionStyleProps }) =>
        theme.background.grayHover};
    }
  }
`;
