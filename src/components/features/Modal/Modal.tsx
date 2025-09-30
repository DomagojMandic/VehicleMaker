import { forwardRef, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';

type ModalProps = {
  isOpen: boolean;
  children: ReactNode;
};

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  backdrop-filter: blur(4px);
  z-index: 1000;
  transition: all 0.5s;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--brown-900);
`;

const ModalContainer = styled.div`
  background: var(--brown-300);
  padding: 16px;
  border-radius: 8px;
  min-width: 300px;
  display: flex;
  flex-direction: column;
  gap: 4rem;
`;

/* We use forward ref so we can target the modal window specifically and not the overlay.
With this, we can advance UX with the click outside of the modal window */

const Modal = forwardRef<HTMLDivElement, ModalProps>(
  ({ isOpen, children }, ref) => {
    if (!isOpen) return null;

    return createPortal(
      <Overlay>
        <ModalContainer ref={ref}>{children}</ModalContainer>
      </Overlay>,
      document.body,
    );
  },
);

Modal.displayName = 'Modal';

export default Modal;
