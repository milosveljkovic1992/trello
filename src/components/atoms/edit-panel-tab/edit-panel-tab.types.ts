import { ReactNode } from 'react';

export interface EditPanelTabProps {
  icon: ReactNode;
  handleClick: () => void;
  children: ReactNode;
}
