import { ChangeEvent } from 'react';

export interface AddBoardProps {
  handleActive: () => void;
  isInputActive: boolean;
  newBoardTitle: string;
  handleCreateNew: () => void;
  handleTitleChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}
