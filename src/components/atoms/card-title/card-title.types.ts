export interface useCardTitleProps {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  handleRename: (
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>,
  ) => void;
}
