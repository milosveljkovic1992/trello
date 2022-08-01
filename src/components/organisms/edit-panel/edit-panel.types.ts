import { Dispatch, SetStateAction, RefObject } from 'react';

import type { CardType } from 'store/card-slice';

export interface IEditPanelProps {
  card: CardType;
  rect: DOMRect;
  isEditOpen: boolean;
  setIsEditOpen: Dispatch<SetStateAction<boolean>>;
  isMoveOpen: boolean;
  setIsMoveOpen: Dispatch<SetStateAction<boolean>>;
  handleOpen: (card: CardType) => void;
  handleMove: (
    card: CardType,
    targetList: string,
    targetPosition: number,
  ) => void;
  handleDelete: (card: CardType) => void;
  cardRef: RefObject<HTMLDivElement>;
}
