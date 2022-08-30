import styled from 'styled-components/macro';
import type { ThemeProps } from 'global/Theme';

type ColumnProps = ThemeProps & {
  height: number;
};

export const Container = styled.div<ThemeProps>`
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

export const CardContainer = styled.div<ColumnProps>`
  height: auto;
  position: relative;
  padding-bottom: 4px;

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
    position: relative;
  }

  .card-container-column {
    position: relative;
  }
`;
