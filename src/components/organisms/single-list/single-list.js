import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import axios from 'axios';
import { AiOutlinePlus } from 'react-icons/ai';

// import { resetListUpdate } from 'store/lists-slice';
import { dragOverList } from 'store/drag-drop-slice';
import { throwError } from 'store/error-slice';

import { AddButton } from 'components/atoms';
import { ListHeading, NewCard, SingleCard } from 'components/molecules';

import { Container } from './single-list-styles';

export const SingleList = ({ listId, name, setIsBoardUpdated }) => {
  const dispatch = useDispatch();
  const { targetListId } = useSelector((state) => state.dragDrop);
  const cards = useSelector((state) => state.cards.cardsArray);

  const [cardsOnThisList, setCardsOnThisList] = useState([]);
  const [isCreatingNew, setIsCreatingNew] = useState(false);
  const [isListUpdated, setIsListUpdated] = useState(true);
  const [listTitle, setListTitle] = useState(name);

  const handleTitle = () => {
    const sendTitle = async () => {
      try {
        await axios.put(`/1/lists/${listId}?name=${listTitle}`);
        setIsListUpdated(false);
      } catch (error) {
        setListTitle(name);
        dispatch(throwError('Could not update title'));
      }
    };

    sendTitle();
  };

  const handleDragEnterList = (listId) => {
    if (listId !== targetListId) {
      dispatch(dragOverList({ listId }));
    }
  };

  useEffect(() => {
    if (isListUpdated) {
      setCardsOnThisList(
        cards
          .filter((card) => card.idList === listId && card)
          .sort((a, b) => (a.pos < b.pos ? -1 : a.pos > b.pos ? 1 : 0)),
      );
      console.log(cardsOnThisList);
      setIsListUpdated(false);
    }
    cardsOnThisList.forEach((card) => console.log(card.pos));
  }, [dispatch, isListUpdated]);

  return (
    <>
      {cards && (
        <Container onDragEnter={() => handleDragEnterList(listId)}>
          <ListHeading
            handleTitle={handleTitle}
            listId={listId}
            listTitle={listTitle}
            setListTitle={setListTitle}
            setIsBoardUpdated={setIsBoardUpdated}
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
