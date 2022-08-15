import { useNewCard } from 'hooks/useNewCard';
import { NewCardProps } from './new-card.types';

import { NewItem } from 'components/atoms';

export const NewCard = ({ setIsCreatingNew, listId }: NewCardProps) => {
  // TODO update hook logic
  const { handleInput, handleSubmit } = useNewCard({
    setIsCreatingNew,
    listId,
  });
  // TODO: update logic
  console.log(listId);

  return (
    <NewItem
      handleInput={handleInput}
      handleSubmit={handleSubmit}
      setIsCreatingNew={setIsCreatingNew}
      placeholder="Enter a title for this card..."
    >
      Add Card
    </NewItem>
  );
};
