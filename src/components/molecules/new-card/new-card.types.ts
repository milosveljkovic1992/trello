import { Dispatch, SetStateAction } from 'react';

export interface NewCardProps {
  setIsCreatingNew: Dispatch<SetStateAction<boolean>>;
  listId: string;
}
