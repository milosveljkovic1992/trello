import styled, { StyledComponent } from 'styled-components/macro';
import type { ThemeProps } from 'global/Theme';

type Props = ThemeProps & {
  isInputActive: boolean;
};

export const Title: StyledComponent<
  'div',
  Record<string, unknown>,
  Record<string, unknown>,
  never
> = styled.div<Props>`
  margin: 0 0 5px;
  position: relative;

  &:focus > .delete-btn,
  &:hover > .delete-btn {
    display: ${({ isInputActive }) => (isInputActive ? 'none' : 'flex')};
  }

  textarea {
    font-family: ${({ theme }: { theme: Props }) => theme.font.fontFamily};
    font-size: 16px;
    font-weight: 600;

    height: 32px;
    width: 100%;
    margin: 0;
    padding: 5px 5px;

    color: ${({ theme }: { theme: Props }) => theme.font.color};
    background-color: transparent;
    border: 2px solid transparent;
    overflow: hidden;
    overflow-wrap: break-word;
    resize: none;
    cursor: pointer;

    &:focus {
      background-color: #fff;
      cursor: auto;
      outline: none;
      border: 2px solid #d7d7d7;
      border-radius: 3px;
    }
    position: relative;
  }

  .delete-btn {
    display: none;
    align-items: center;
    justify-content: center;

    position: absolute;
    height: 32px;
    width: 32px;
    right: 0;
    top: 0;

    background-color: #fff;
    border: none;
    border-radius: 3px;
    cursor: pointer;

    & > * {
      font-size: 16px;
    }

    &:focus,
    &:hover {
      background-color: #e7e7e7;
      border: 2px solid #e7e7e7;
    }
  }
`;
