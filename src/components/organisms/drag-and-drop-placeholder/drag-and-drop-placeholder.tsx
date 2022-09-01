import { useSelector } from 'react-redux';

import { RootState } from 'store';

import { SingleCardContent } from 'components/molecules';

export const DragAndDropPlaceholder = ({ id }: { id: string }) => {
  const cards = useSelector((state: RootState) => state.cards.cardsArray);
  const card = cards.find((card) => card.id === id);

  if (!card) return <div style={{ height: '59px' }}></div>;

  return <SingleCardContent card={card} />;
};
