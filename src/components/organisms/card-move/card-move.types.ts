import { Dispatch, SetStateAction } from 'react';

import type { CardType } from 'store/card-slice';

export interface CardMoveProps {
  rect: DOMRect;
  card: CardType;
  setIsMoveOpen: Dispatch<SetStateAction<boolean>>;
  handleMove: (
    card: CardType,
    targetList: string,
    targetPosition: number,
  ) => void;
  index: number;
}
