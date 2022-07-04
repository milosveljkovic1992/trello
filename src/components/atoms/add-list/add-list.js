import React from 'react';
import { AiOutlinePlus } from 'react-icons/ai';

import { AddButton } from 'components/atoms';
import { NewListContainer } from 'components/molecules';

import { Container } from './add-list-styles';


export const AddList = (props) => {
    const {
        creatingNewList,
        setCreatingNewList,
        boardId,
        setIsBoardUpdated,
        pos
    } = props;

    return (
        <Container>
            {!creatingNewList
              ? <AddButton onClick={() => setCreatingNewList(true)} icon={<AiOutlinePlus />}>
                  Add another list
                </AddButton>
              : <NewListContainer 
                setCreatingNewList={setCreatingNewList}
                boardId={boardId}
                setIsBoardUpdated={setIsBoardUpdated}
                pos={pos}
              />
            }
          </Container>
    )
}