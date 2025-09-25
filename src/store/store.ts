import { configureStore } from '@reduxjs/toolkit';
import { vehicleApi } from './vehicleApiSlice';

const store = configureStore({
  reducer: {
    [vehicleApi.reducerPath]: vehicleApi.reducer,
  },

  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(vehicleApi.middleware);
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
