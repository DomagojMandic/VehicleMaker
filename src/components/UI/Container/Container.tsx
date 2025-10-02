import type { ComponentProps, PropsWithChildren } from 'react';
import StyledContainer from './StyledContainer';

type StyledContainerProps = ComponentProps<typeof StyledContainer>;

type ContainerProps = PropsWithChildren & StyledContainerProps;

function Container({
  children,
  $direction,
  $maxWidth,
  $width,
  $padding,
  $gap,
  $justify,
  $align,
  $backgroundColor,
  $color,
  $height,
  $radius,
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
      $width={$width}
      $radius={$radius}
    >
      {children}
    </StyledContainer>
  );
}

export default Container;
