import { useNavigate } from 'react-router';

export function useMoveBack() {
  const navigate = useNavigate();

  return (route?: string) => {
    if (route) {
      navigate(route);
    } else {
      navigate(-1);
    }
  };
}
