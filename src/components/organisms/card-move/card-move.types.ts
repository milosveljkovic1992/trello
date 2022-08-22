import { Dispatch, SetStateAction } from 'react';

import type { CardType } from 'store/card-slice';

export interface CardMoveProps {
  rect: DOMRect;
  card: CardType;
  setIsMoveOpen: Dispatch<SetStateAction<boolean>>;
  index: number;
}
