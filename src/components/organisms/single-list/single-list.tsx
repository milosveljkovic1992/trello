import { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { Droppable } from 'react-beautiful-dnd';
import { AiOutlinePlus } from 'react-icons/ai';

import { RootState, useAppDispatch } from 'store';
import { resetListUpdate } from 'store/lists-slice';
import { dragOverList } from 'store/drag-drop-slice';
import type { CardType } from 'store/card-slice';

import { AddButton } from 'components/atoms';
import { ListTitle, NewCard, SingleCard } from 'components/molecules';

import { SingleListProps } from './single-list.types';
import { CardContainer, Container } from './single-list.styles';

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
    const sortCards = (cards: CardType[]) => {
      return cards
        .filter((card: CardType) => card.idList === listId)
        .sort((a, b) => (a.pos < b.pos ? -1 : a.pos > b.pos ? 1 : 0));
    };

    if (isListUpdated) {
      const sortedList = sortCards(cards);
      setCardsOnThisList(sortedList);
      setIsListUpdated(false);
    }

    if (updatedListId === listId) {
      const sortedList = sortCards(cards);
      setCardsOnThisList(sortedList);
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
          <Droppable droppableId={listId}>
            {(provided) => (
              <CardContainer
                className="card-container"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
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
                {provided.placeholder}
              </CardContainer>
            )}
          </Droppable>
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
