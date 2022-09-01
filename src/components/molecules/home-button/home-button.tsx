import { HomeButtonProps } from './home-button.props';
import { IconContainer } from './home-button.styles';

export const HomeButton = ({ handleClick, icon }: HomeButtonProps) => {
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
