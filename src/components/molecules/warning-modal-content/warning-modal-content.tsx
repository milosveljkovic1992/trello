import { MouseEvent, ReactNode, useEffect, useRef, useState } from 'react';

import { Modal } from './warning-modal-content.styles';

interface WarningModalContentProps {
  children: ReactNode;
  handleDelete: () => void;
  handleCancel: () => void;
}

export const WarningModalContent = ({
  children,
  handleDelete,
  handleCancel,
}: WarningModalContentProps) => {
  const [isLoading, setIsLoading] = useState(true);

  const handleClose = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target === target.closest('.warning-modal-overlay')) {
      handleCancel();
    }
  };

  const animationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isLoading) {
      animationRef.current?.classList.add('zoom-in-animation');
      animationRef.current?.classList.add('fade-in-animation');
    }
    setIsLoading(false);
  }, [isLoading]);

  return (
    <Modal onClick={handleClose} className="warning-modal-overlay">
      <div className="inner-container" ref={animationRef}>
        <header>
          <h3>{children}</h3>
        </header>
        <p>
          This action is irreversible. <br />
          Are you sure you wish to continue?
        </p>
        <div className="button-container">
          <button onClick={handleDelete} className="warning-button">
            Delete
          </button>
          <button onClick={handleCancel} className="cancel-button">
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};
