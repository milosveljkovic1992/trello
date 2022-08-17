import styled, { StyledComponent } from 'styled-components/macro';
import type { ThemeProps } from 'global/Theme';

export const Container: StyledComponent<
  'div',
  Record<string, unknown>,
  Record<string, unknown>,
  never
> = styled.div<ThemeProps>`
  .input-container {
    position: relative;
    width: 252px;
    height: auto;
    min-height: 29px;
    margin: 0 0 8px;
    background-color: #fff;
    border-radius: ${({ theme }: { theme: ThemeProps }) =>
      theme.border.borderRadius};
    box-shadow: 0 1px #bbb;

    user-select: none;
  }

  .button-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 10px;
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

  textarea {
    width: 100%;
    border: none;
    height: auto;
    min-height: 60px;
    max-height: 160px;
    resize: vertical;
    margin-bottom: -3px;
    padding: 5px 5px 0;

    &:focus {
      outline: none;
    }
  }

  button {
    color: #fff;
    background-color: ${({ theme }) => theme.background.primary};
    border: none;
    box-shadow: none;
    padding: 6px 12px;
    cursor: pointer;
    transition: 0.135s;

    &:focus,
    &:hover {
      background-color: ${({ theme }) => theme.background.primaryHover};
    }
  }
`;

export const IconContainer = styled.div``;
