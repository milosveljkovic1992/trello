import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux/es/exports';

import axios from 'axios';
import { AiOutlineClose } from 'react-icons/ai';

import { Container } from './card-description-styles';
import { throwError } from 'store/error-slice';

export const CardDescription = () => {
  const dispatch = useDispatch();
  const card = useSelector((state) => state.card.details);
  const { isLoading } = useSelector((state) => state.card);
  const [isInitialRender, setIsInitialRender] = useState(true);
  const [description, setDescription] = useState('');
  const [previousDescription, setPreviousDescription] = useState('');
  const [isActive, setIsActive] = useState(false);

  const descRef = useRef(null);

  const handleEdit = () => {
    const fetchDescription = async () => {
      try {
        await axios.put(`/1/cards/${card.id}?desc=${description}`);
      } catch (error) {
        dispatch(throwError('Description could not be edited'));
        setDescription(previousDescription);
      }
    };
    fetchDescription();
  };

  const handleActive = (e) => {
    if (e.target.closest('.desc-btn')) {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  };

  useEffect(() => {
    if (isActive) {
      descRef.current.select();
    }
    setPreviousDescription(description);
  }, [isActive]);

  useEffect(() => {
    if (isInitialRender && !isLoading) {
      setDescription(card.desc);
      setIsInitialRender(false);
    }
  }, [isInitialRender, isLoading, card]);

  return (
    <Container
      isActive={isActive}
      onClick={(e) => handleActive(e)}
      className="desc-box"
      hasDescription={description}
    >
      <p className="desc-content">
        {description || 'Add a more detailed description...'}
      </p>

      <textarea
        className="desc-input"
        placeholder="Add a more detailed description..."
        ref={descRef}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>

      <div className="icon-container">
        <div className="btn-container">
          <button className="desc-btn" onClick={() => handleEdit()}>
            Save
          </button>

          <div
            className="desc-btn close-icon-container"
            onClick={() => {
              setIsActive(false);
              setDescription(previousDescription);
            }}
          >
            <AiOutlineClose />
          </div>
        </div>
      </div>
    </Container>
  );
};
