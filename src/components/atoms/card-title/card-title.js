import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import axios from 'axios';

import { informListUpdate } from 'store/lists-slice';
import { throwError } from 'store/error-slice';

import { Container } from './card-title-styles';

export const CardTitle = () => {
  const dispatch = useDispatch();
  const card = useSelector((state) => state.card.details);

  const [title, setTitle] = useState(card.name);
  const [isActive, setIsActive] = useState(false);
  const titleRef = React.useRef(null);

  useEffect(() => {
    if (isActive) {
      titleRef.current.select();
    }
  }, [isActive]);

  const handleChange = () => {
    const submitChange = async () => {
      try {
        await axios.put(`/1/cards/${card.id}?name=${title}`);
      } catch (error) {
        dispatch(throwError('Title could not be changed'));
      }
    };

    if (title.trim().length > 0) {
      submitChange();
      dispatch(informListUpdate(card.idList));
    } else {
      setTitle(card.name);
    }
    setIsActive(false);
  };

  useEffect(() => {
    if (card.name !== title) {
      setTitle(card.name);
    }
  }, [card]);

  return (
    <Container isActive={isActive}>
      {!isActive ? (
        <h2 onClick={() => setIsActive(true)}>{title}</h2>
      ) : (
        <input
          ref={titleRef}
          onBlur={handleChange}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      )}
    </Container>
  );
};
