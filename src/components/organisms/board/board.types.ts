import { Dispatch, ReactNode, SetStateAction } from 'react';

import { BoardType } from 'store/board-slice';

export interface BoardProps {
  children: ReactNode;
  board: BoardType;
  boardName: string;
  setBoardName: Dispatch<SetStateAction<string>>;
  isEditNameActive: boolean;
  setIsEditNameActive: Dispatch<SetStateAction<boolean>>;
}
