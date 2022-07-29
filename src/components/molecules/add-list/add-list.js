import { AiOutlinePlus } from 'react-icons/ai';

import { AddButton } from 'components/atoms';
import { NewList } from 'components/atoms';

import { Container } from './add-list-styles';

export const AddList = ({
  isCreatingNewList,
  setIsCreatingNewList,
  boardId,
}) => {
  return (
    <Container>
      {!isCreatingNewList ? (
        <AddButton
          onClick={() => setIsCreatingNewList(true)}
          icon={<AiOutlinePlus />}
        >
          Add another list
        </AddButton>
      ) : (
        <NewList
          setIsCreatingNewList={setIsCreatingNewList}
          boardId={boardId}
        />
      )}
    </Container>
  );
};
