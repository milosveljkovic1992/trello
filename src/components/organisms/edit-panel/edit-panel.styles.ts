import styled from 'styled-components/macro';
import type { ThemeProps } from 'global/Theme';

type EditPanelStyleProps = ThemeProps & {
  rect: DOMRect;
  direction: string;
};

export const Overlay = styled.div<EditPanelStyleProps>`
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
    height: 111px;
    z-index: 3;
    display: block;
    padding-left: 8px;
    transform: ${({ direction }) =>
      direction === 'left' ? 'translateX(-20px)' : 'translateX(0px)'};
    transition: 0.1s;

    &.card-edit {
      transform: ${({ direction }) =>
        direction === 'left' ? 'translateX(0px)' : 'translateX(-20px)'};
    }
  }

  .save-button {
    color: #fff;
    background-color: ${({ theme }: { theme: EditPanelStyleProps }) =>
      theme.background.primary};
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
      background-color: ${({ theme }: { theme: EditPanelStyleProps }) =>
        theme.background.primaryHover};
    }
  }
`;
