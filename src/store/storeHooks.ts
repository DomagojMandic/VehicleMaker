import {
  useDispatch,
  useSelector,
  type TypedUseSelectorHook,
} from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Ensures type safety across the application so we don't have to cast in every component
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
