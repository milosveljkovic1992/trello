import { Dispatch, SetStateAction } from 'react';

export interface NewListProps {
  setIsCreatingNewList: Dispatch<SetStateAction<boolean>>;
  boardId: string;
}
