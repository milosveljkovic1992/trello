import type { CardType } from 'store/card-slice';

export interface EditPanelProps {
  card: CardType;
  rect: DOMRect;
  index: number;
}
