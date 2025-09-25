// RTK Query imports - createApi for API slice, fakeBaseQuery for direct Supabase calls
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  getAllVehicleMakes,
  getAllVehicleModels,
  type GetVehiclesParams,
  type VehicleMakesResponse,
  type VehicleModelsResponse,
} from '../api/vehicleApi';

/* Because of Pagination, we had to include the count of total items and 
make a seperate Response type */

export const vehicleApi = createApi({
  reducerPath: 'vehicleApi', // Redux store key name
  baseQuery: fakeBaseQuery<string>(),
  tagTypes: ['VehicleMake', 'VehicleModel'],
  endpoints: (builder) => ({
    /* ======================= VEHICLE MAKES FUNCTIONS ======================= */
    /* Void is replaced with the actual query parameters for paginating */
    getVehicleMakes: builder.query<VehicleMakesResponse, GetVehiclesParams>({
      /* Functions are made in a way in which they are compatible with the RTK Query data
        and error formats. */
      queryFn: ({ page }) => getAllVehicleMakes({ page }),
      providesTags: ['VehicleMake'], // This query caches VehicleMake data
    }),
    /* ======================= VEHICLE MODELS FUNCTIONS ======================= */
    getVehicleModels: builder.query<VehicleModelsResponse, GetVehiclesParams>({
      queryFn: ({ page }) => getAllVehicleModels({ page }),
      providesTags: ['VehicleModel'],
    }),
  }),
});

// Auto-generated hooks for use in React components
export const { useGetVehicleMakesQuery, useGetVehicleModelsQuery } = vehicleApi;
