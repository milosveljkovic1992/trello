import { ReactNode, MouseEvent } from 'react';

import { BoardType } from 'store/board-slice';

export interface BoardCardProps {
  board: BoardType;
  icon: ReactNode;
  handleClick: (e: MouseEvent<HTMLDivElement>, board: BoardType) => void;
  handleDelete: (id: string) => void;
}
