import styled from 'styled-components';
import type { FormEvent, ReactNode } from 'react';

const gridColumnAreas = `"title        title"
    "labelVehicle         labelVehicle"
    "inputVehicle  inputVehicle"
    "labelSelect       labelSelect"
    "inputSelect  inputSelect"
    "labelAbrv      labelAbrv"
    "inputAbrv     inputAbrv"`;

interface StyledFormProps {
  $gridColumnAreas?: string;
  $width?: string;
}

interface FormRowProps {
  $direction?: 'row' | 'column';
  $area: string;
  $alignItems?: string;
}

const StyledForm = styled.form<StyledFormProps>`
  display: grid;
  grid-template-areas: ${(props) => props.$gridColumnAreas || gridColumnAreas};
  grid-template-columns: 2fr 1fr;
  grid-template-rows: auto auto auto auto;
  gap: 1.5rem;
  width: ${(props) => props.$width || 'min(90%, 850px)'};
  margin-inline: auto;
  padding: 2.5rem;
  background-color: var(--white);
  border: 1px solid var(--gray-300);
  border-radius: 12px;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.07);
`;

export const FormRow = styled.div<FormRowProps>`
  display: flex;
  flex-direction: ${(props) => props.$direction || 'column'};
  gap: 0.5rem;
  grid-area: ${(props) => props.$area};
  align-items: ${(props) => props.$alignItems || ''};
  align-self: center;

  ${(props) => {
    switch (props.$area) {
      case 'description':
      case 'submit':
        return 'align-self: stretch;';
      case 'logo':
        return `
          align-self: center;
          align-items: center; 
          justify-content: center; 
        `;
      default:
        return 'align-self: center;';
    }
  }}
`;

/* eslint-disable react/require-default-props */
interface FormBaseProps {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
  $gridColumnAreas?: string;
  $width?: string;
}

function FormBase({
  onSubmit,
  children,
  $gridColumnAreas = gridColumnAreas,
  $width = 'min(90%, 850px)',
}: FormBaseProps) {
  return (
    <StyledForm
      onSubmit={onSubmit}
      $gridColumnAreas={$gridColumnAreas}
      $width={$width}
    >
      {children}
    </StyledForm>
  );
}

export default FormBase;
