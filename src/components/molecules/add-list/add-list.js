import { AiOutlinePlus } from 'react-icons/ai';

import { AddButton } from 'components/atoms';
import { NewList } from 'components/atoms';

import { Container } from './add-list-styles';

export const AddList = ({ creatingNewList, setCreatingNewList, boardId }) => {
  return (
    <Container>
      {!creatingNewList ? (
        <AddButton
          onClick={() => setCreatingNewList(true)}
          icon={<AiOutlinePlus />}
        >
          Add another list
        </AddButton>
      ) : (
        <NewList setCreatingNewList={setCreatingNewList} boardId={boardId} />
      )}
    </Container>
  );
};
