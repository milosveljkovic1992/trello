import type { CardType } from 'store/card-slice';

export interface CardMoveProps {
  rect: DOMRect;
  card: CardType;
  handleCloseMove: () => void;
  index: number;
}
