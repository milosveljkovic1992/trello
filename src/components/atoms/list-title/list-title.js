import { FaTrashAlt } from 'react-icons/fa';

import { useListTitle } from 'hooks/useListTitle';

import { Title } from 'components/atoms/list-title/list-title-styles';

export const ListTitle = ({ handleTitle, listId, listTitle, setListTitle }) => {
  const {
    isInputActive,
    handleSendToArchive,
    handleFocus,
    handleBlur,
    titleRef,
  } = useListTitle({ listId, handleTitle });

  return (
    <Title isInputActive={isInputActive}>
      <textarea
        ref={titleRef}
        onDrop={() => false}
        value={listTitle}
        onClick={handleFocus}
        onChange={(e) => setListTitle(e.target.value)}
        onBlur={handleBlur}
      ></textarea>
      <div className="delete-btn" onClick={handleSendToArchive}>
        <FaTrashAlt />
      </div>
    </Title>
  );
};
