import styled from 'styled-components/macro';

interface Props {
  rect: DOMRect;
  direction: string;
}

export const Overlay = styled.div<Props>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: #0009;
  z-index: 2;

  .container {
    position: absolute;
    top: ${({ rect }) => `${rect.y}px`};
    left: ${({ rect }) => (rect.x < 0 ? '10px' : `${rect.x}px`)};
    width: ${({ rect }) => `${rect.width}px`};
  }

  textarea {
    width: 252px;
    min-height: 120px;
    resize: none;
    border-radius: 5px;
    padding: 6px 8px;
    outline: none;
  }

  .edit-options-container {
    position: absolute;
    left: ${({ direction }) => (direction === 'left' ? '100%' : '-120px')};
    top: 0px;
    width: 130px;
    height: 100px;
    z-index: 3;
    display: block;
    // transform: translateX(-20px);
    transform: ${({ direction }) =>
      direction === 'left' ? 'translateX(-20px)' : 'translateX(0px)'};
    transition: 0.1s;

    &.card-edit {
      transform: ${({ direction }) =>
        direction === 'left' ? 'translateX(0px)' : 'translateX(-20px)'};
    }
  }

  .edit-options-tab {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;

    padding: 6px 12px 6px 8px;
    margin-left: 8px;
    margin-bottom: 4px;
    border-radius: 3px;
    background-color: #0009;

    cursor: pointer;
    transition: 0.135s ease-in-out;

    &:focus,
    &:hover {
      background-color: #000c;
      transform: translateX(5px);
    }

    .edit-options-icon-container {
      display: flex;
      align-items: center;
      margin-right: 5px;

      & > svg {
        font-size: 14px;
      }
      & > svg > path {
        color: #fff;
      }
    }

    .edit-options-tab-label {
      color: #fff;
    }
  }

  .save-button {
    color: #fff;
    background-color: ${({ theme }) => theme.background.primary};
    border: none;
    box-shadow: none;
    padding: 8px 16px;
    border-radius: 3px;
    cursor: pointer;
    transition: 0.135s;
    position: absolute;
    bottom: -45px;
    left: 0;

    &:focus,
    &:hover {
      background-color: ${({ theme }) => theme.background.primaryHover};
    }
  }
`;
