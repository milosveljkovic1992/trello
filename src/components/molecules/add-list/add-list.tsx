import { AiOutlinePlus } from 'react-icons/ai';

import { AddButton, NewList } from 'components/atoms';

import { AddListProps } from './add-list.types';
import { Container } from './add-list.styles';

export const AddList = ({
  isCreatingNewList,
  setIsCreatingNewList,
  boardId,
}: AddListProps) => {
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
