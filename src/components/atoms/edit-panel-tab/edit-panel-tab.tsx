import { Tab } from './edit-panel-tab.styles';
import { EditPanelTabProps } from './edit-panel-tab.types';

export const EditPanelTab = ({
  icon,
  handleClick,
  children,
}: EditPanelTabProps) => {
  return (
    <Tab className="edit-options-tab" onClick={handleClick}>
      <div className="edit-options-icon-container">{icon}</div>
      {children}
    </Tab>
  );
};
