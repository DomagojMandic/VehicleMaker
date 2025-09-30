import { useEffect, useRef, useState, type ReactNode } from 'react';
import Modal from './Modal';
import Button from '../../UI/Button/Button';
import ButtonWrapper from '../../UI/Button/ButtonWrapper';

type DeleteVehicleProps = {
  children: ReactNode;
  onDelete: (id: number) => void;
  id: number;
};

/* This components accepts the children prop (text) and has 2 buttons, Cancel and Delete.
The event handler that we pass to this component will be called when clicking the Delete button 
and will be responsible for deleting. */

function DeleteVehicle({ children, onDelete, id }: DeleteVehicleProps) {
  const [isOpen, setIsOpen] = useState(false);

  /* We use this ref to target only the modal window and not the overlay */
  const ref = useRef<HTMLDivElement>(null);

  /* We use this effect to close the modal when clicking outside of it. We have to pass the
  third argument because we are capturing the event */
  useEffect(() => {
    function handleClose(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('click', handleClose, true);

    /* Cleanup function */
    return () => {
      document.removeEventListener('click', handleClose, true);
    };
  }, [setIsOpen]);

  return (
    <>
      <Button $size="large" onClick={() => setIsOpen(true)}>
        Delete Vehicle Model
      </Button>

      {/* We conditionally render the modal based on state */}
      {isOpen && (
        <Modal ref={ref} isOpen={isOpen}>
          <ButtonWrapper $justify="flex-end" $width="100%" $height="auto">
            <Button onClick={() => setIsOpen(false)}>X</Button>
          </ButtonWrapper>
          {children}
          <ButtonWrapper $justify="space-between" $width="100%" $height="auto">
            <Button onClick={() => setIsOpen(false)}>Cancel</Button>
            <Button
              onClick={() => {
                onDelete(id);
              }}
            >
              Delete
            </Button>
          </ButtonWrapper>
        </Modal>
      )}
    </>
  );
}

export default DeleteVehicle;
