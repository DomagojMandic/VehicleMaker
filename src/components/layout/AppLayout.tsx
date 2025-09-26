import { Outlet } from 'react-router';
import Header from '../UI/Header/Header';
import Button from '../UI/Button/Button';
import { useMoveBack } from '../../utils/hooks/useMoveBack';
import Main from './Main';
import StyledAppLayout from './StyledAppLayout';

function AppLayout() {
  const moveBack = useMoveBack();

  return (
    <StyledAppLayout>
      <Header>
        <Button onClick={moveBack} $size="large">
          Back
        </Button>
      </Header>
      <Main>
        <Outlet />
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
