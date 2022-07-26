import { useNewList } from 'hooks/useNewList';

import { NewItem } from 'components/atoms';

export const NewList = (props) => {
  const { handleInput, handleSubmit } = useNewList(props);

  return (
    <NewItem
      handleInput={handleInput}
      handleSubmit={handleSubmit}
      setIsCreatingNew={props.setCreatingNewList}
      placeholder="Enter list title..."
    >
      Add list
    </NewItem>
  );
};
