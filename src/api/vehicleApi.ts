import { PAGE_SIZE } from './constants';
import supabase from './supabase';
import type {
  VehicleMake,
  VehicleModel,
  VehicleModelDb,
  VehicleModelNotFlat,
} from './types';

/* Here we define functions and types that will be called with RTK Query */

/* ================================= ERROR FORMATS ============================== */
/* Supabase error format

{
  "message": "column "XYZ" does not exist",
  "details": null,
  "hint": null,
  "code": "42703"
}

*/

/* RTK Query (2) error format

{
error: 
  {
    status: 400,
    data: { message: "Column 'XYZ' does not exist", code: "42703" }
  }

}

*/

/* ============================== API FUNCTIONS ============================= */

/* ============================== VEHICLE MAKES ============================= */

export type VehicleMakesResponse = {
  items: VehicleMake[];
  count: number;
};

export type VehicleModelsResponse = {
  items: VehicleModel[];
  count: number;
};

export type GetVehiclesParams = {
  page?: number;
};

export type GetModelsByIdParams = {
  makeId: string;
  page?: number;
};

// RTK Query compatible function - returns { data } or { error }
export async function getAllVehicleMakes({ page }: GetVehiclesParams) {
  try {
    // Call Supabase to fetch all records from VehicleMake table
    let query = supabase
      .from('VehicleMake')
      /* Here we pass count as exact when we only need a certain amount of results */
      .select('*', { count: 'exact' }); // Select all columns

    if (page) {
      const from = (page - 1) * PAGE_SIZE; // Calculate starting index
      const to = from + PAGE_SIZE - 1;
      // Implement pagination logic if needed
      query = query.range(from, to); // Define range based on page and page size
    }

    const { data, error: vehicleMakeError, count } = await query;

    // Handle Supabase errors (object - we don't throw it so that RTK Query can handle it)
    if (vehicleMakeError) {
      console.error('Supabase error:', vehicleMakeError);
      return { error: vehicleMakeError.message };
    }

    // Return data in RTK Query success format
    return {
      data: {
        items: (data as VehicleMake[]) || [],
        count: count ?? 0,
      },
    };
  } catch (error) {
    // Catches network errors and return RTK Query error format
    console.error('Network error:', error);
    return { error: 'Network connection failed' };
  }
}

export async function getVehicleMakeById({ id }: { id: string | undefined }) {
  try {
    const { data: vehicleMake, error } = await supabase
      .from('VehicleMake')
      .select('*')
      .eq('id', id)
      .single<VehicleMake>();

    if (error) {
      console.error('Supabase error:', error);
      return { error: error.message };
    }

    return { data: vehicleMake as VehicleMake };
  } catch (error) {
    console.error('Network error:', error);
    return { error: 'Network connection failed' };
  }
}

export async function updateMake(vehicleMake: VehicleMake) {
  const { data: updatedVehicle, error: updateError } = await supabase
    .from('VehicleMake')
    .update(vehicleMake)
    .eq('id', vehicleMake.id)
    .select()
    .single();

  if (updateError) {
    console.error('Supabase error:', updateError);
    return { error: updateError.message };
  }

  return { data: updatedVehicle as VehicleMake };
}

/* ============================== VEHICLE MODELS ============================= */

export async function getAllVehicleModels({ page }: GetVehiclesParams) {
  try {
    let query = supabase
      .from('VehicleModel')
      .select('*, VehicleMake(name)', { count: 'exact' });

    if (page) {
      const from = (page - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;
      query = query.range(from, to);
    }

    const { data, error: vehicleModelError, count } = await query;

    const flattenedData = (data as VehicleModelNotFlat[]).map((item) => {
      const { VehicleMake, ...rest } = item;
      return {
        ...rest,
        carMaker: VehicleMake.name,
      };
    });

    // Handle Supabase errors (object - we don't throw it so that RTK Query can handle it)
    if (vehicleModelError) {
      console.error('Supabase error:', vehicleModelError);
      return { error: vehicleModelError.message };
    }

    // Return data in RTK Query success format
    return {
      data: {
        items: (flattenedData as VehicleModel[]) || [],
        count: count ?? 0,
      },
    };
  } catch (error) {
    // Catches network errors and return RTK Query error format
    console.error('Network error:', error);
    return { error: 'Network connection failed' };
  }
}

export async function getVehicleModelsByMakeId({
  makeId,
  page,
}: GetModelsByIdParams) {
  try {
    let query = supabase
      .from('VehicleModel')
      .select('*, VehicleMake(name)', { count: 'exact' })
      .eq('makeId', makeId); // Filter by makeId

    if (page) {
      const from = (page - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;
      query = query.range(from, to);
    }

    const { data, error: vehicleModelError, count } = await query;

    if (vehicleModelError) {
      console.error('Supabase error:', vehicleModelError);
      return { error: vehicleModelError.message };
    }

    const flattenedData = (data as VehicleModelNotFlat[]).map((item) => {
      const { VehicleMake, ...rest } = item;
      return {
        ...rest,
        carMaker: VehicleMake.name,
      };
    });

    return {
      data: {
        items: (flattenedData as VehicleModel[]) || [],
        count: count ?? 0,
      },
    };
  } catch (error) {
    console.error('Network error:', error);
    return { error: 'Network connection failed' };
  }
}

export async function getVehicleModelById({ id }: { id: string | undefined }) {
  try {
    const { data: vehicleModel, error } = await supabase
      .from('VehicleModel')
      .select('*, VehicleMake(name)')
      .eq('id', id)
      .single<VehicleModelNotFlat>();

    if (error) {
      console.error('Supabase error:', error);
      return { error: error.message };
    }

    const { VehicleMake, ...rest } = vehicleModel;
    const flattenedVehicle = {
      ...rest,
      carMaker: VehicleMake.name,
    };

    return { data: flattenedVehicle as VehicleModel };
  } catch (error) {
    console.error('Network error:', error);
    return { error: 'Network connection failed' };
  }
}

export async function updateModel(
  vehicleModel: Omit<VehicleModel, 'carMaker'>,
) {
  const { data: updatedVehicle, error: updateError } = await supabase
    .from('VehicleModel')
    .update(vehicleModel)
    .eq('id', vehicleModel.id)
    .select()
    .single();

  if (updateError) {
    console.error('Supabase error:', updateError);
    return { error: updateError.message };
  }

  return { data: updatedVehicle as VehicleModelDb };
}
