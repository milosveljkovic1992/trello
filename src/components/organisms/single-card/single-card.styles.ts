import styled from 'styled-components/macro';
import type { ThemeProps } from 'global/Theme';

export const Container = styled.div<ThemeProps>`
  position: relative;
  width: 252px;
  min-height: 29px;
  margin: 0 0 8px;
  background-color: #fff;
  border-radius: ${({ theme }: { theme: ThemeProps }) =>
    theme.border.borderRadius};
  box-shadow: 0 1px #bbb;

  user-select: none;

  &:focus,
  &:hover {
    background-color: #f4f5f7;
  }

  .card-content-box {
    padding: 5px 29px 5px 8px;
    cursor: pointer;

    p {
      margin: 2px 0;
    }
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

  .badges {
    margin-top: 8px;
    display: flex;
    flex-direction: row;

    svg > path {
      color: #6b778c;
    }
  }

  .badge-icon-container {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    line-height: 1;

    margin: 0 10px 5px 0;

    .badge-icon {
      margin-right: 3px;
    }
  }
`;
