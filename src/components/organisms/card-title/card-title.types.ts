import { KeyboardEvent } from 'react';

export interface useCardTitleProps {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  handleRename: () => void;
  handleEnter: (e: KeyboardEvent) => void;
}
