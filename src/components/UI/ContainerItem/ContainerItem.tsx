import type { ComponentProps, PropsWithChildren } from 'react';
import StyledContainerItem from './StyledContainerItem';

type StyledContainerItemProps = ComponentProps<typeof StyledContainerItem>;

type ContainerItemProps = PropsWithChildren & StyledContainerItemProps;

function ContainerItem({
  children,
  $flex,
  $padding,
  $backgroundColor,
  $borderRadius,
  to,
}: ContainerItemProps) {
  return (
    <StyledContainerItem
      to={to}
      $flex={$flex}
      $padding={$padding}
      $backgroundColor={$backgroundColor}
      $borderRadius={$borderRadius}
    >
      {children}
    </StyledContainerItem>
  );
}

export default ContainerItem;
