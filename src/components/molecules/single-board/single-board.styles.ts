import styled from 'styled-components/macro';

export const Container = styled.div`
  position: relative;
  overflow: visible;
  background-color: #c7c7c7;
  background-size: cover;
  border-radius: 3px;

  .board-box {
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

  .board-box-title {
    word-break: break-word;
    text-overflow: ellipsis;
    padding-top: 2px;
    user-select: none;

    color: #fff;
    font-weight: 700;
    text-shadow: 0 0 3px #000;
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
`;
