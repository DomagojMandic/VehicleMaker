import { createBrowserRouter, Navigate, RouterProvider } from 'react-router';
import { Toaster } from 'react-hot-toast';
import AppLayout from './components/layout/AppLayout';
import Home from './pages/Home';
import VehicleModel from './pages/VehicleModel';
import VehicleMake from './pages/VehicleMake';
import VehicleItem from './pages/VehicleItem';
import { toasterOptions } from './components/features/Toaster/ToasterOptions';

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
        children: [{ path: ':type/:vehicleItemId', element: <VehicleItem /> }],
      },
    ],
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster {...toasterOptions} />
    </>
  );
}

export default App;
