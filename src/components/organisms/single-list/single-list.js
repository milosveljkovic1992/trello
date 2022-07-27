import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { AiOutlinePlus } from 'react-icons/ai';

import { resetListUpdate } from 'store/lists-slice';
import { dragOverList } from 'store/drag-drop-slice';

import { AddButton, ListTitle, NewCard } from 'components/atoms';
import { SingleCard } from 'components/molecules';

import { Container } from './single-list-styles';

export const SingleList = ({ listId, name }) => {
  const dispatch = useDispatch();
  const cards = useSelector((state) => state.cards.cardsArray);
  const { targetListId } = useSelector((state) => state.dragDrop);
  const { updatedListId } = useSelector((state) => state.lists);

  const [cardsOnThisList, setCardsOnThisList] = useState([]);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [isListUpdated, setIsListUpdated] = useState(true);
  const [listTitle, setListTitle] = useState(name);

  const handleDragEnterList = (listId) => {
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
                    key={card.id}
                    index={index}
                    card={card}
                    setIsListUpdated={setIsListUpdated}
                    setCardsOnThisList={setCardsOnThisList}
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
