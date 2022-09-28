import styled from 'styled-components/macro';
import type { ThemeProps } from 'global/Theme';

type MiniModalStyleProps = ThemeProps & {
  rect: DOMRect;
  position: string;
};

export const Modal = styled.div<MiniModalStyleProps>`
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  z-index: 4;

  .minimodal-container {
    position: fixed;
    top: ${({ rect }) =>
      rect.y + 190 < window.innerHeight
        ? `${rect.y + 36}px`
        : `${rect.y - 190}px`};
    left: ${({ rect }) => `${rect.x}px`};
    width: ${({ rect }) => `${rect.width}px`};
    padding: 0 12px 12px;
    background-color: white;
    border-radius: 3px;
    border: 1px solid rgba(0, 0, 0, 0.1);

    @media (min-width: 300px) {
      left: ${({ rect, position }) =>
        position === 'left' ? `${rect.x}px` : `${rect.x + rect.width - 300}px`};
    }

    @media (min-width: 320px) {
      width: 300px;
    }

    z-index: 4;
  }
`;
