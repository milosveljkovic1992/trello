import type { CardType } from 'store/card-slice';

export interface SingleCardContentProps {
  card: CardType;
  isEditPanelOpen?: boolean;
  editPanelId?: string;
  handleRect?: (rect: DOMRect) => void;
}
