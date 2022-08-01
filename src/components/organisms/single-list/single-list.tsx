import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { AiOutlinePlus } from 'react-icons/ai';

import { RootState, useAppDispatch } from 'store';
import { resetListUpdate } from 'store/lists-slice';
import { dragOverList } from 'store/drag-drop-slice';

import { AddButton, ListTitle, NewCard } from 'components/atoms';
import { SingleCard } from 'components/molecules';

import { SingleListProps } from './single-list.types';
import { Container } from './single-list.styles';
import { CardType } from 'store/card-slice';
import { nanoid } from 'nanoid';

export const SingleList = ({ listId, name }: SingleListProps) => {
  const dispatch = useAppDispatch();
  const cards = useSelector((state: RootState) => state.cards.cardsArray);
  const { targetListId } = useSelector((state: RootState) => state.dragDrop);
  const { updatedListId } = useSelector((state: RootState) => state.lists);

  const [cardsOnThisList, setCardsOnThisList] = useState<CardType[]>([]);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [isListUpdated, setIsListUpdated] = useState(true);
  const [listTitle, setListTitle] = useState(name);

  const handleDragEnterList = (listId: string) => {
    if (listId !== targetListId) {
      dispatch(dragOverList({ listId }));
    }
  };

  useEffect(() => {
    if (isListUpdated || updatedListId === listId) {
      setCardsOnThisList(
        cards
          .filter((card) => card.idList === listId)
          .sort((a, b) => (a.pos < b.pos ? -1 : a.pos > b.pos ? 1 : 0)),
      );
      setIsListUpdated(false);
      dispatch(resetListUpdate());
    }
  }, [dispatch, isListUpdated, updatedListId]);

  return (
    <>
      {cards && (
        <Container onDragEnter={() => handleDragEnterList(listId)}>
          <ListTitle
            oldTitle={name}
            listId={listId}
            listTitle={listTitle}
            setListTitle={setListTitle}
          />
          <div className="card-container">
            {cardsOnThisList.map(
              (card, index) =>
                card.idList === listId && (
                  <SingleCard
                    key={nanoid()}
                    index={index}
                    card={card}
                    setIsListUpdated={setIsListUpdated}
                  />
                ),
            )}
          </div>
          {!isCreatingNew ? (
            <AddButton
              onClick={() => setIsCreatingNew(true)}
              icon={<AiOutlinePlus />}
            >
              Add a card
            </AddButton>
          ) : (
            <NewCard setIsCreatingNew={setIsCreatingNew} listId={listId} />
          )}
        </Container>
      )}
    </>
  );
};
