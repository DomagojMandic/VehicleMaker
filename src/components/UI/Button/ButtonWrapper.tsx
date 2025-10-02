import type { ReactNode, ComponentProps } from 'react';
import styled from 'styled-components';

type JustifyOptions = 'space-between' | 'center' | 'flex-end';

interface WrapperProps {
  $width?: string;
  $height?: string;
  $justify?: JustifyOptions;
  $gap?: string;
}

const StyledWrapper = styled.div<WrapperProps>`
  width: ${(props) => props.$width || '20rem'};
  height: ${(props) => props.$height || '15rem'};
  display: flex;
  align-items: center;
  justify-content: ${(props) => props.$justify || 'center'};
`;

type StyledWrapperProps = ComponentProps<typeof StyledWrapper>;

type ButtonWrapperProps = StyledWrapperProps & { children: ReactNode };

function ButtonWrapper({
  children,
  $width,
  $height,
  $justify,
  $gap,
}: ButtonWrapperProps) {
  return (
    <StyledWrapper
      $width={$width}
      $height={$height}
      $justify={$justify}
      $gap={$gap}
    >
      {children}
    </StyledWrapper>
  );
}

export default ButtonWrapper;
