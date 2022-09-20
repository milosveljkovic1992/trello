import styled from 'styled-components/macro';
import type { ThemeProps } from 'global/Theme';

export const Container = styled.div<ThemeProps>`
  width: 100%;
  border-radius: 3px;
  min-height: 40px;
  background: #fff;
  margin-bottom: 10px;
  padding: 8px 10px;
  transition: 0.1s;

  textarea {
    width: 100%;
    margin-bottom: -3px;
    border: 0;
    resize: none;
    overflow-y: hidden;

    &:focus {
      outline: none;
    }
  }

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

  .icon-container {
    padding: 6px;
    display: flex;
    align-items: center;
    border-radius: ${({ theme }: { theme: ThemeProps }) =>
      theme.border.borderRadius};
    cursor: pointer;

    &:focus,
    &:hover {
      background-color: ${({ theme }: { theme: ThemeProps }) =>
        theme.background.grayHover};
    }
  }
`;
