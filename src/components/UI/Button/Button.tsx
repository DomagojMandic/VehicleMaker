import type { ComponentProps } from 'react';
import StyledButton from './StyledButton';

type StyledButtonProps = ComponentProps<typeof StyledButton>;

interface ButtonProps extends StyledButtonProps {
  children: React.ReactNode;
}

function Button({
  children,
  $size,
  disabled = false,
  type = 'button',
  ...rest
}: ButtonProps) {
  return (
    /* eslint-disable react/jsx-props-no-spreading */
    <StyledButton $size={$size} disabled={disabled} type={type} {...rest}>
      {children}
    </StyledButton>
  );
}

export default Button;
