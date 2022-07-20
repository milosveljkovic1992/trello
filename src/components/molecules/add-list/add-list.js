import { AiOutlinePlus } from 'react-icons/ai';

import { AddButton } from 'components/atoms';
import { NewList } from 'components/molecules';

import { Container } from './add-list-styles';

export const AddList = (props) => {
  const {
    creatingNewList,
    setCreatingNewList,
    boardId,
    setIsBoardUpdated,
    pos,
  } = props;

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
        <NewList
          setCreatingNewList={setCreatingNewList}
          boardId={boardId}
          setIsBoardUpdated={setIsBoardUpdated}
          pos={pos}
        />
      )}
    </Container>
  );
};
