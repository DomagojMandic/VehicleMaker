import type { ComponentProps, PropsWithChildren } from 'react';
import StyledContainer from './StyledContainer';

type StyledContainerProps = ComponentProps<typeof StyledContainer>;

type ContainerProps = PropsWithChildren & StyledContainerProps;

function Container({
  children,
  $direction,
  $maxWidth,
  $padding,
  $gap,
  $justify,
  $align,
  $backgroundColor,
  $color,
  $height,
}: ContainerProps) {
  return (
    <StyledContainer
      $direction={$direction}
      $maxWidth={$maxWidth}
      $padding={$padding}
      $gap={$gap}
      $justify={$justify}
      $align={$align}
      $backgroundColor={$backgroundColor}
      $color={$color}
      $height={$height}
    >
      {children}
    </StyledContainer>
  );
}

export default Container;
