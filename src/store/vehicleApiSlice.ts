// RTK Query imports - createApi for API slice, fakeBaseQuery for direct Supabase calls
import { createApi, fakeBaseQuery } from '@reduxjs/toolkit/query/react';
import {
  createMake,
  createModel,
  deleteMake,
  deleteModel,
  getAllVehicleMakes,
  getAllVehicleModels,
  getVehicleMakeById,
  getVehicleModelById,
  getVehicleModelsByMakeId,
  updateMake,
  updateModel,
  type GetModelsByIdParams,
  type GetVehiclesParams,
  type VehicleMakesResponse,
  type VehicleModelsResponse,
} from '../api/vehicleApi';
import {
  type VehicleMake,
  type VehicleModel,
  type VehicleModelDb,
} from '../api/types';

/* Because of Pagination, we had to include the count of total items and 
make a seperate Response type */

export const vehicleApi = createApi({
  reducerPath: 'vehicleApi', // Redux store key name
  baseQuery: fakeBaseQuery<string>(),
  tagTypes: [
    'VehicleMake',
    'VehicleModels',
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
      providesTags: (_, __, { id }) => [{ type: 'VehicleMakeById', id }],
    }),
    updateVehicleMake: builder.mutation<VehicleMake, VehicleMake>({
      queryFn: (vehicleMake) => updateMake(vehicleMake),
      invalidatesTags: (_, __, { id }) => [
        /* We are invalidating everything so the UI updates in real time. */
        { type: 'VehicleMakeById', id },
        { type: 'VehicleMake' },
        { type: 'VehiclesByMakeId' },
      ],
    }),
    createVehicleMake: builder.mutation<
      VehicleMake,
      Omit<VehicleMake, 'id' | 'created_at'>
    >({
      queryFn: (makeData) => createMake(makeData),
      invalidatesTags: ['VehicleMake'],
    }),
    deleteVehicleMake: builder.mutation<VehicleMake, { id: number }>({
      queryFn: ({ id }) => deleteMake(id),
      invalidatesTags: (_, __, { id }) => [
        { type: 'VehicleMakeById', id },
        { type: 'VehicleMake' },
        { type: 'VehiclesByMakeId' },
        'VehicleModels',
      ],
    }),

    /* ======================= VEHICLE MODELS FUNCTIONS ======================= */
    getVehicleModels: builder.query<VehicleModelsResponse, GetVehiclesParams>({
      queryFn: ({ page }) => getAllVehicleModels({ page }),
      providesTags: ['VehicleModels'],
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
      providesTags: (_, __, { id }) => [{ type: 'VehicleModel', id }],
    }),
    updateVehicleModel: builder.mutation<
      VehicleModelDb,
      Omit<VehicleModel, 'carMaker'>
    >({
      queryFn: (vehicleModel) => updateModel(vehicleModel),
      invalidatesTags: (_, __, { id }) => [
        { type: 'VehicleModel', id },
        { type: 'VehicleModels' },
        { type: 'VehiclesByMakeId' },
      ],
    }),
    createVehicleModel: builder.mutation<
      VehicleModelDb,
      Omit<VehicleModel, 'id' | 'created_at' | 'carMaker'>
    >({
      queryFn: (modelData) => createModel(modelData),
      invalidatesTags: ['VehicleModels', 'VehiclesByMakeId', 'VehicleModel'],
    }),
    deleteVehicleModel: builder.mutation<VehicleModelDb, { id: number }>({
      queryFn: ({ id }) => deleteModel(id),
      invalidatesTags: (_, __, { id }) => [
        { type: 'VehicleModel', id },
        { type: 'VehicleModels' },
        { type: 'VehiclesByMakeId' },
      ],
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
  useUpdateVehicleMakeMutation,
  useUpdateVehicleModelMutation,
  useCreateVehicleMakeMutation,
  useCreateVehicleModelMutation,
  useDeleteVehicleMakeMutation,
  useDeleteVehicleModelMutation,
} = vehicleApi;
