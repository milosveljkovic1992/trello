import { Dispatch, SetStateAction } from 'react';

export interface AddListProps {
  isCreatingNewList: boolean;
  setIsCreatingNewList: Dispatch<SetStateAction<boolean>>;
  boardId: string;
}
