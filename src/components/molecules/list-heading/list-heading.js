import { useState, useRef } from 'react';

import axios from 'axios';
import { FaTrashAlt } from 'react-icons/fa';

import { ListTitle } from 'components/atoms';

export const ListHeading = ({
  handleTitle,
  listId,
  listTitle,
  setListTitle,
  setIsBoardUpdated,
}) => {
  const titleRef = useRef(null);
  const [isInputActive, setIsInputActive] = useState(false);

  const handleSendToArchive = () => {
    const sendRequest = async () => {
      await axios.put(`/1/lists/${listId}?closed=true`);
      setIsBoardUpdated(true);
    };
    sendRequest();
  };

  const handleFocus = () => {
    setIsInputActive(true);
    titleRef.current.select();
  };

  const handleBlur = () => {
    handleTitle();
    setIsInputActive(false);
  };

  return (
    <ListTitle
      isInputActive={isInputActive}
      ref={titleRef}
      listTitle={listTitle}
      setListTitle={setListTitle}
      handleFocus={handleFocus}
      handleBlur={handleBlur}
      handleSendToArchive={handleSendToArchive}
      icon={<FaTrashAlt />}
    />
  );
};
