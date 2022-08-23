import { ReactNode, ChangeEvent } from 'react';

export interface NewItemProps {
  children: ReactNode;
  handleInput: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: () => void;
  handleClose: () => void;
  placeholder: string;
  input: string;
}
