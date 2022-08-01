import { ReactNode } from 'react';

export interface AddButtonProps {
  children: ReactNode;
  onClick: () => void;
  icon: ReactNode;
}
