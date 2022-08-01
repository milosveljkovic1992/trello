export type { RootState } from 'store';

export interface IuseCardTitle {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  handleRename: (
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>,
  ) => void;
}
