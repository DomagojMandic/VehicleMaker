import type { PropsWithChildren } from 'react';
import StyledMain from './StyledMain';

type MainProps = PropsWithChildren;

function Main({ children }: MainProps) {
  return <StyledMain>{children}</StyledMain>;
}

export default Main;
