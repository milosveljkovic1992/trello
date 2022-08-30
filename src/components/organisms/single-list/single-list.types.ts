import { ListType } from 'store/lists-slice';

export interface SingleListProps {
  list: ListType;
  dragSourceListId: string;
  dragTargetListId: string;
}
