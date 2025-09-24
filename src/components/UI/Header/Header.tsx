import type { ComponentProps, PropsWithChildren } from 'react';
import StyledHeader from './StyledHeader';

type StyledHeaderProps = ComponentProps<typeof StyledHeader>;

type HeaderProps = PropsWithChildren & StyledHeaderProps;

function Header({ children }: HeaderProps) {
  return <StyledHeader>{children}</StyledHeader>;
}

export default Header;
