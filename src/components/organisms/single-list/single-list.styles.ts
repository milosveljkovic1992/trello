import styled from 'styled-components/macro';

type ColumnProps = {
  height: number;
};

export const Container = styled.div`
  width: 272px;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;

  background-color: ${({ theme }) => theme.background.gray};
  padding: 10px;
  border-radius: ${({ theme }) => theme.border.borderRadius};
`;

export const CardContainer = styled.div<ColumnProps>`
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
