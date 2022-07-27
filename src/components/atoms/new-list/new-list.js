import { useNewList } from 'hooks/useNewList';

import { NewItem } from 'components/atoms';

export const NewList = ({ setCreatingNewList, boardId }) => {
  const { handleInput, handleSubmit } = useNewList({
    setCreatingNewList,
    boardId,
  });

  return (
    <NewItem
      handleInput={handleInput}
      handleSubmit={handleSubmit}
      setIsCreatingNew={setCreatingNewList}
      placeholder="Enter list title..."
    >
      Add list
    </NewItem>
  );
};
