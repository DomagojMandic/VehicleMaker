import styled from 'styled-components';
import { forwardRef } from 'react';
import type { InputHTMLAttributes } from 'react';

const StyledFormInput = styled.input`
  font-size: clamp(1.2rem, 2.5vw, 1.4rem);
  width: 100%;
  background-color: var(--white);
  color: var(--gray-900);
  outline: none;
  border: 1px solid var(--gray-300);
  border-radius: 8px;
  padding: clamp(0.8rem, 2vw, 1rem);
  transition:
    box-shadow 0.3s,
    border-color 0.3s;

  &:focus {
    border-color: var(--brown-500);
    box-shadow: 0 0 0 1px var(--brown-500);
  }
`;
/* eslint-disable react/require-default-props */
interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  type?: string;
  placeholder?: string;
  id?: string;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ type = 'text', placeholder = '', id, ...props }, ref) => {
    return (
      <StyledFormInput
        ref={ref}
        type={type}
        placeholder={placeholder}
        id={id}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...props}
      />
    );
  },
);

FormInput.displayName = 'FormInput';

export default FormInput;
