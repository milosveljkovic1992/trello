import { ReactNode } from 'react';
import type { CardType } from 'store/card-slice';

export interface CardMoveProps {
  rect: DOMRect;
  card: CardType;
  handleClosePanel: () => void;
  index: number;
  children: ReactNode;
}
