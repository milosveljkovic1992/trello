import { RefObject } from 'react';

import type { CardType } from 'store/card-slice';

export interface useSetPositionProps {
  card: CardType;
  index: number;
  listRef: RefObject<HTMLSelectElement>;
  positionRef: RefObject<HTMLSelectElement>;
  type: string;
}
