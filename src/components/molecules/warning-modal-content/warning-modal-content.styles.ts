import styled from 'styled-components/macro';

export const Modal = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 20%;

  background-color: rgba(0, 0, 0, 0.05);
  z-index: 3;

  .inner-container {
    width: 90%;
    max-width: 380px;

    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 20px;

    text-align: center;
    padding: 20px;
    border-radius: 4px;
    background-color: #fff;

    transform: scale(0.75);
    opacity: 0;
    transition: 0.1s ease-in-out opacity, 0.1s ease-in-out transform;

    &.zoom-in-animation {
      transform: scale(1);
    }

    &.fade-in-animation {
      opacity: 1;
    }

    h3 {
      font-size: 1.5rem;
      font-width: 600;
      padding-bottom: 10px;
      border-bottom: 1px solid rgba(9, 30, 66, 0.13);
    }

    .button-container {
      display: flex;
      flex-direction: row;
      justify-content: space-between;

      button {
        border: none;
        padding: 0.75em 2em;

        &.cancel-button {
          cursor: pointer;
          background-color: rgba(0, 0, 0, 0.1);
          transition: 0.15s background-color;

          &:focus,
          &:hover {
            background-color: rgba(0, 0, 0, 0.2);
          }
        }
      }
    }
  }
`;
