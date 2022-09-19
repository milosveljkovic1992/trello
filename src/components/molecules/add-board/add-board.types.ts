import { ChangeEvent, KeyboardEvent } from 'react';

export interface AddBoardProps {
  handleActive: () => void;
  isInputActive: boolean;
  newBoardTitle: string;
  handleCreateNew: () => void;
  handleTitleChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  handleEnter: (e: KeyboardEvent) => void;
}
