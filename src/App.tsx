import { Provider } from 'react-redux';

import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';
import { Toaster } from 'react-hot-toast';

import AppLayout from './components/layout/AppLayout';
import { toasterOptions } from './components/features/Toaster/ToasterOptions';

import Home from './pages/Home';
import VehicleModel from './pages/VehicleModel';
import VehicleMake from './pages/VehicleMake';
import store from './store/store';
import ModelEntity from './pages/ModelEntity';
import MakeEntity from './pages/MakeEntity';

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
          { path: 'model/:vehicleItemId', element: <ModelEntity /> },
          { path: 'make/:vehicleItemId', element: <MakeEntity /> },
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
