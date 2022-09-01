import { useState, useEffect } from 'react';

import { nanoid } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { Droppable } from '@hello-pangea/dnd';

import { RootState, useAppDispatch } from 'store';
import { resetListUpdate, resetOriginListUpdate } from 'store/lists-slice';
import type { CardType } from 'store/card-slice';

import {
  AddCard,
  DragAndDropPlaceholder,
  ListTitle,
  SingleCard,
} from 'components/organisms';

import { SingleListProps } from './single-list.types';
import { CardContainer, Container } from './single-list.styles';

export const SingleList = ({
  list,
  dragSourceListId,
  dragTargetListId,
}: SingleListProps) => {
  const dispatch = useAppDispatch();
  const cards = useSelector((state: RootState) => state.cards.cardsArray);
  const { updatedListId, updatedOriginListId } = useSelector(
    (state: RootState) => state.lists,
  );

  const listId = list.id;

  const [cardsOnThisList, setCardsOnThisList] = useState<CardType[]>([]);
  const [isListUpdated, setIsListUpdated] = useState(true);

  useEffect(() => {
    const sortCards = (cards: CardType[]) => {
      return cards
        .filter((card: CardType) => card.idList === listId)
        .sort((a, b) => (a.pos < b.pos ? -1 : a.pos > b.pos ? 1 : 0));
    };

    const shouldSortCards =
      isListUpdated ||
      updatedOriginListId === listId ||
      updatedListId === listId;

    if (shouldSortCards) {
      const sortedList = sortCards(cards);
      setCardsOnThisList(sortedList);
      setIsListUpdated(false);
    }

    if (updatedOriginListId === listId) {
      dispatch(resetOriginListUpdate());
    } else if (updatedListId === listId) {
      dispatch(resetListUpdate());
    }
  }, [dispatch, isListUpdated, updatedListId, updatedOriginListId]);

  return (
    <>
      {cards && (
        <Container>
          <ListTitle list={list} />
          <Droppable
            droppableId={listId}
            mode="virtual"
            renderClone={(provided, snapshot, rubric) => (
              <div
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
              >
                <DragAndDropPlaceholder id={rubric.draggableId} />
              </div>
            )}
          >
            {(provided, snapshot) => {
              const style = {
                height:
                  snapshot.isDraggingOver &&
                  dragSourceListId !== dragTargetListId
                    ? (cardsOnThisList.length + 1) * (59 + 8)
                    : cardsOnThisList.length * (59 + 8),
              };
              return (
                <CardContainer
                  className="card-container-column"
                  style={style}
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {cardsOnThisList.map(
                    (card, index) =>
                      card.idList === listId && (
                        <SingleCard key={nanoid()} card={card} index={index} />
                      ),
                  )}
                </CardContainer>
              );
            }}
          </Droppable>

          <AddCard listId={listId} />
        </Container>
      )}
    </>
  );
};
