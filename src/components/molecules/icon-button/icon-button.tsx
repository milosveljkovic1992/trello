import { IconButtonProps } from './icon-button.types';
import { IconContainer } from './icon-button.styles';

export const IconButton = ({ handleClick, icon }: IconButtonProps) => {
  return (
    <IconContainer
      className="board-icon-container"
      onClick={handleClick}
      role="home-button"
    >
      {icon}
    </IconContainer>
  );
};
