import styled from 'styled-components';
import type { ReactNode } from 'react';

const StyledFormLabel = styled.label`
  font-size: 1.4rem;
  color: var(--gray-700);
  display: inline-block;
  transition:
    transform 0.3s ease,
    color 0.3s ease;
  transform-origin: left center;
  position: relative;
  cursor: pointer;
  padding-left: 1rem;
  padding-bottom: 0.5rem;
`;

interface FormLabelProps {
  children: ReactNode;
  htmlFor: string;
}

function FormLabel({ children, htmlFor }: FormLabelProps) {
  return <StyledFormLabel htmlFor={htmlFor}>{children}</StyledFormLabel>;
}

export default FormLabel;
