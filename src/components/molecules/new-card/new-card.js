import { useNewCard } from 'hooks/useNewCard';

import { NewItem } from 'components/atoms';

export const NewCard = ({ setIsCreatingNew, listId }) => {
  const { handleInput, handleSubmit } = useNewCard({
    setIsCreatingNew,
    listId,
  });

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
