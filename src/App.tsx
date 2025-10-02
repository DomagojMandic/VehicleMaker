import { Provider } from 'react-redux';
import { lazy } from 'react';

import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';
import { Toaster } from 'react-hot-toast';

import AppLayout from './components/layout/AppLayout';
import { toasterOptions } from './components/features/Toaster/ToasterOptions';

import Home from './pages/Home';
import VehicleModel from './pages/VehicleModel';
import VehicleMake from './pages/VehicleMake';
import store from './store/store';

/* This doesn't need to be lazy loaded because it's only 7kb, but for the purpose of this
example, we will lazy load it because it is the furthest point of the application */
const ModelEntityLazy = lazy(() => import('./pages/ModelEntity'));
const MakeEntityLazy = lazy(() => import('./pages/MakeEntity'));

const router = createBrowserRouter([
  {
    path: '/home',
    element: <Home />,
  },
  { index: true, element: <Navigate to="/home" replace /> },

  {
    path: '/',
    element: <AppLayout />,
    children: [
      { path: 'models', element: <VehicleModel /> },
      { path: 'makes', element: <VehicleMake /> },
      {
        path: 'vehicle',
        children: [
          { path: 'model/:vehicleItemId', element: <ModelEntityLazy /> },
          { path: 'make/:vehicleItemId', element: <MakeEntityLazy /> },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Toaster {...toasterOptions} />
    </Provider>
  );
}

export default App;
