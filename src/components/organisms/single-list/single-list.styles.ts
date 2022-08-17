import styled, { StyledComponent } from 'styled-components/macro';
import type { ThemeProps } from 'global/Theme';

type ColumnProps = ThemeProps & {
  height: number;
};

export const Container: StyledComponent<
  'div',
  Record<string, unknown>,
  Record<string, unknown>,
  never
> = styled.div<ColumnProps>`
  width: 272px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;

  background-color: ${({ theme }: { theme: ThemeProps }) =>
    theme.background.gray};
  padding: 10px;
  border-radius: ${({ theme }: { theme: ThemeProps }) =>
    theme.border.borderRadius};
`;

export const CardContainer: StyledComponent<
  'div',
  Record<string, unknown>,
  Record<string, unknown>,
  never
> = styled.div<ColumnProps>`
  height: 100%;

  ::-webkit-scrollbar {
    padding-left: 5px;
    height: 8px;
    width: 8px;
  }
  ::-webkit-scrollbar-track-piece {
    background: rgba(9, 30, 66, 0.08);
  }
  ::-webkit-scrollbar-thumb {
    background: rgba(9, 30, 66, 0.2);
    border-radius: 50px;
  }

  &.drag-over {
    height: ${({ height }) => `${height}px`};
  }

  [data-rbd-droppable-id] {
    min-height: 5px;
  }
`;
