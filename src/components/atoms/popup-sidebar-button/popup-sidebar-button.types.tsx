import { ReactNode } from 'react';

export interface PopupSidebarButtonProps {
  icon: ReactNode;
  handleClick: () => void;
  children: ReactNode;
}
