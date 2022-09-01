import { ReactNode } from 'react';

export interface ButtonWithIconProps {
  children: ReactNode;
  onClick: () => void;
  icon: ReactNode;
}
