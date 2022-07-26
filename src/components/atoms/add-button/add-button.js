import { Button } from './add-button-styles';

export const AddButton = ({ children, onClick, icon }) => {
  return (
    <Button onClick={onClick}>
      <span>{icon}</span>
      <span>{children}</span>
    </Button>
  );
};
