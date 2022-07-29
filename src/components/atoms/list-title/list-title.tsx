import { FaTrashAlt } from 'react-icons/fa';

import { useAppDispatch } from 'store';
import { archiveList } from 'store/lists-slice';
import { useListTitle } from 'hooks/useListTitle';

import { ListTitleProps } from './list-title.types';
import { Title } from 'components/atoms/list-title/list-title.styles';

export const ListTitle = ({
  oldTitle,
  listId,
  listTitle,
  setListTitle,
}: ListTitleProps) => {
  const dispatch = useAppDispatch();
  const { isInputActive, handleFocus, handleBlur, titleRef } = useListTitle({
    oldTitle,
    listId,
    listTitle,
    setListTitle,
  });

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
      <div className="delete-btn" onClick={() => dispatch(archiveList(listId))}>
        <FaTrashAlt />
      </div>
    </Title>
  );
};
