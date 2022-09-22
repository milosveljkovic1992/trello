import { Button } from './popup-sidebar-button.styles';
import { PopupSidebarButtonProps } from './popup-sidebar-button.types';

export const PopupSidebarButton = ({
  handleClick,
  icon,
  children,
}: PopupSidebarButtonProps) => {
  return (
    <Button onClick={handleClick}>
      {icon}
      {children}
    </Button>
  );
};
