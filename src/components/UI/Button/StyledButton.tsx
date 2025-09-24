import type { ButtonHTMLAttributes } from 'react';
import styled from 'styled-components';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  $size?: 'small' | 'medium' | 'large';
}

const sizes = {
  small: `
    padding: 0.75rem 1rem;
    font-size: 1.2rem;
  `,
  medium: `
    padding:1rem 1.2rem;
    font-size: 1.4rem;
  `,
  large: `
    padding: 1.25rem 1.5rem;
    font-size: 1.6rem;
  `,
};

const StyledButton = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  transform: translateY(0);
  font-weight: 500;
  font-family: inherit;

  /* Apply size styles */
  ${(props) => sizes[props.$size || 'medium']}

  background-color: var(--brown-900);
  color: var(--white);
  border: 1px solid var(--brown-700);

  &:hover {
    background-color: var(--brown-700);
    border-color: var(--brown-900);
    transform: translateY(-2px);
    box-shadow:
      0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
  }

  &:active {
    background-color: var(--brown-900);
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: translateY(0);

    &:hover {
      transform: translateY(0);
      box-shadow: none;
    }
  }

  &:focus-visible {
    outline: 2px solid var(--blue-500);
    outline-offset: 2px;
  }
`;

export default StyledButton;
