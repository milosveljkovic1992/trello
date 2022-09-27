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
  const deleteRef = useRef<HTMLButtonElement>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    deleteRef.current?.focus();

    const handleKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.key === 'Enter' && document.activeElement !== cancelRef.current) {
        handleDelete();
      }
      if (e.key === 'Escape') handleCancel();
      if (e.key === 'ArrowRight') cancelRef.current?.focus();
      if (e.key === 'ArrowLeft') deleteRef.current?.focus();
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

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
          <button
            onClick={handleDelete}
            className="warning-button"
            ref={deleteRef}
          >
            Delete
          </button>
          <button
            onClick={handleCancel}
            className="cancel-button"
            ref={cancelRef}
          >
            Cancel
          </button>
        </div>
      </div>
    </Modal>
  );
};
