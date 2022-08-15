import { ReactNode, Dispatch, SetStateAction, ChangeEvent } from 'react';

export interface NewItemProps {
  children: ReactNode;
  handleInput: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  handleSubmit: () => void;
  setIsCreatingNew: Dispatch<SetStateAction<boolean>>;
  placeholder: string;
}
