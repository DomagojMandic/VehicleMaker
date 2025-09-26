// RTK Query imports - createApi for API slice, fakeBaseQuery for direct Supabase calls
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  getAllVehicleMakes,
  getAllVehicleModels,
  getVehicleMakeById,
  getVehicleModelById,
  getVehicleModelsByMakeId,
  type GetModelsByIdParams,
  type GetVehiclesParams,
  type VehicleMakesResponse,
  type VehicleModelsResponse,
} from '../api/vehicleApi';
import { type VehicleMake, type VehicleModel } from '../api/types';

/* Because of Pagination, we had to include the count of total items and 
make a seperate Response type */

export const vehicleApi = createApi({
  reducerPath: 'vehicleApi', // Redux store key name
  baseQuery: fakeBaseQuery<string>(),
  tagTypes: [
    'VehicleMake',
    'VehicleModel',
    'VehiclesByMakeId',
    'VehicleModel',
    'VehicleMakeById',
  ],
  endpoints: (builder) => ({
    /* ======================= VEHICLE MAKES FUNCTIONS ======================= */
    /* Void is replaced with the actual query parameters for paginating */
    getVehicleMakes: builder.query<VehicleMakesResponse, GetVehiclesParams>({
      /* Functions are made in a way in which they are compatible with the RTK Query data
        and error formats. */
      queryFn: ({ page }) => getAllVehicleMakes({ page }),
      providesTags: ['VehicleMake'], // This query caches VehicleMake data
    }),
    getVehicleMake: builder.query<VehicleMake, { id: string }>({
      queryFn: ({ id }) => getVehicleMakeById({ id }),
      providesTags: ['VehicleMakeById'],
    }),
    /* ======================= VEHICLE MODELS FUNCTIONS ======================= */
    getVehicleModels: builder.query<VehicleModelsResponse, GetVehiclesParams>({
      queryFn: ({ page }) => getAllVehicleModels({ page }),
      providesTags: ['VehicleModel'],
    }),
    getVehicleModelsByMake: builder.query<
      VehicleModelsResponse,
      GetModelsByIdParams
    >({
      queryFn: ({ makeId, page }) => getVehicleModelsByMakeId({ makeId, page }),
      providesTags: ['VehiclesByMakeId'],
    }),
    getVehicleModelById: builder.query<VehicleModel, { id: string }>({
      queryFn: ({ id }) => getVehicleModelById({ id }),
      providesTags: ['VehicleModel'],
    }),
  }),
});

// Auto-generated hooks for use in React components
export const {
  useGetVehicleMakesQuery,
  useGetVehicleMakeQuery,
  useGetVehicleModelsQuery,
  useGetVehicleModelsByMakeQuery,
  useGetVehicleModelByIdQuery,
} = vehicleApi;
