import { useNewList } from 'hooks/useNewList';

import { NewListProps } from './new-list.types';
import { NewItem } from 'components/atoms';

export const NewList = ({ setIsCreatingNewList, boardId }: NewListProps) => {
  const { handleInput, handleSubmit } = useNewList({
    setIsCreatingNewList,
    boardId,
  });

  return (
    <NewItem
      handleInput={handleInput}
      handleSubmit={handleSubmit}
      setIsCreatingNew={setIsCreatingNewList}
      placeholder="Enter list title..."
    >
      Add list
    </NewItem>
  );
};
