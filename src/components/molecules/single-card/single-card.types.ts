import { Dispatch, SetStateAction } from 'react';
import { CardType } from 'store/card-slice';

export interface SingleCardProps {
  index: number;
  card: CardType;
  setIsListUpdated: Dispatch<SetStateAction<boolean>>;
}
