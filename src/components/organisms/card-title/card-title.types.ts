export interface useCardTitleProps {
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  handleRename: () => void;
}
