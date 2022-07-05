import styled from 'styled-components/macro';

export const Container = styled.div`
  position: relative;
  width: 252px;
  min-height: 29px;
  margin: 0 0 8px;
  background-color: #fff;
  border-radius: ${({ theme }) => theme.border.borderRadius};
  box-shadow: 0 1px #bbb;

  user-select: none;

  .placeholder {
    position: absolute;
    background-color: #ddd;
    border-radius: ${({ theme }) => theme.border.borderRadius};
  }

  .card-title {
    width: calc(100% - 29px);
    padding: 5px 8px;
    cursor: pointer;

    &:focus,
    &:hover {
      background-color: #f4f5f7;
    }
  }

  .edit-btn {
    display: none;
    align-items: center;
    justify-content: center;

    position: absolute;
    right: 0;
    top: 0;
    height: 29px;
    width: 29px;

    background-color: #fff;
    border: none;
    border-radius: 0 3px 3px 0;
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
