import { RefObject } from 'react';
import { ListType } from 'store/lists-slice';

export interface useListTitleProps {
  titleRef: RefObject<HTMLTextAreaElement>;
  list: ListType;
}
