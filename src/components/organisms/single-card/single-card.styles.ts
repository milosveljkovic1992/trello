import styled from 'styled-components/macro';
import type { ThemeProps } from 'global/Theme';

type SingleCardStyleProps = ThemeProps & {
  index: number;
};

export const Container = styled.div<SingleCardStyleProps>`
  position: absolute;
  top: ${({ index }: SingleCardStyleProps) => index * (59 + 8)}px;
  width: 252px;
  height: 59px;
  margin: 4px 0 4px;
  background-color: #fff;
  border-radius: ${({ theme }: { theme: ThemeProps }) =>
    theme.border.borderRadius};
  box-shadow: 0 1px #bbb;

  user-select: none;

  transition: 0.15s;

  &:focus,
  &:hover {
    background-color: #f4f5f7;
  }

  .edit-btn {
    display: none;
    align-items: center;
    justify-content: center;

    position: absolute;
    right: 2px;
    top: 2px;
    height: 29px;
    width: 29px;

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

  &:hover > .edit-btn,
  &:focus > .edit-btn {
    display: flex;
  }
`;
