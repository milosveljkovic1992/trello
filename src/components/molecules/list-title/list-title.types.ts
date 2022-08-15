import { Dispatch, SetStateAction } from 'react';

export interface ListTitleProps {
  oldTitle: string;
  listId: string;
  listTitle: string;
  setListTitle: Dispatch<SetStateAction<string>>;
}
