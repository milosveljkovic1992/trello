import { RefObject, SetStateAction } from 'react';

import type { CardType } from 'store/card-slice';

export interface useCardMoveProps {
  card: CardType;
  index: number;
  listRef: RefObject<HTMLSelectElement>;
  positionRef: RefObject<HTMLSelectElement>;
  setIsMoveOpen: React.Dispatch<SetStateAction<boolean>>;
}
