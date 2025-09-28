import { forwardRef, type SelectHTMLAttributes } from 'react';
import styled from 'styled-components';
import type { VehicleMake, VehicleModel } from '../../../api/types';

export type Vehicle = VehicleMake | VehicleModel;

const StyledSelect = styled.select`
  width: 100%;
  font-family: var(--font-main);
  color: var(--gray-700);
  background-color: var(--white);
  font-size: var(--font-size-base);
  border: 1px solid var(--gray-300);
  border-radius: 8px;
  padding: 0.5rem 1rem;
  outline: none;
  transition: border-color 0.3s;

  &:focus {
    outline: 2px solid var(--blue-500);
    outline-offset: 2px;
    border-color: var(--blue-500);
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

const StyledOption = styled.option`
  color: var(--gray-700);
  background-color: var(--white);
`;

/* eslint-disable react/require-default-props */
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  vehicleArray: Vehicle[];
  disabled?: boolean;
}

const FormSelect = forwardRef<HTMLSelectElement, SelectProps>(
  // eslint-disable-next-line react/display-name
  ({ vehicleArray, disabled = true, ...props }, ref) => {
    if (vehicleArray.length === 0) return null;

    return (
      // eslint-disable-next-line react/jsx-props-no-spreading
      <StyledSelect ref={ref} disabled={disabled} {...props}>
        {vehicleArray.map((vehicle) => (
          <StyledOption key={vehicle.id} value={vehicle.id}>
            {vehicle.name}
          </StyledOption>
        ))}
      </StyledSelect>
    );
  },
);

FormSelect.displayName = 'FormSelect';

export default FormSelect;
