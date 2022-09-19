import { ReactNode, ChangeEvent, KeyboardEvent } from 'react';

export interface NewItemProps {
  children: ReactNode;
  handleInput: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  handleEnter: (e: KeyboardEvent) => void;
  handleSubmit: () => void;
  handleClose: () => void;
  placeholder: string;
  input: string;
}
