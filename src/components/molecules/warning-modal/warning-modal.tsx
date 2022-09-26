import { ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { WarningModalContent } from 'components/molecules';

interface WarningModalProps {
  handleDelete: () => void;
  handleCancel: () => void;
  children: ReactNode;
}

export const WarningModal = ({
  handleDelete,
  handleCancel,
  children,
}: WarningModalProps) => {
  const warningRoot = document.getElementById('warning-root');

  if (!warningRoot) return null;

  return (
    warningRoot &&
    createPortal(
      <WarningModalContent
        handleDelete={handleDelete}
        handleCancel={handleCancel}
      >
        {children}
      </WarningModalContent>,
      warningRoot,
    )
  );
};
