import { PAGE_SIZE } from './constants';
import supabase from './supabase';
import type { VehicleMake, VehicleModel } from './types';

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

/* ============================== VEHICLE MODELS ============================= */

export async function getAllVehicleModels({ page }: GetVehiclesParams) {
  try {
    let query = supabase.from('VehicleModel').select('*', { count: 'exact' });

    if (page) {
      const from = (page - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;
      query = query.range(from, to);
    }

    const { data, error: vehicleModelError, count } = await query;

    // Handle Supabase errors (object - we don't throw it so that RTK Query can handle it)
    if (vehicleModelError) {
      console.error('Supabase error:', vehicleModelError);
      return { error: vehicleModelError.message };
    }

    // Return data in RTK Query success format
    return {
      data: {
        items: (data as VehicleModel[]) || [],
        count: count ?? 0,
      },
    };
  } catch (error) {
    // Catches network errors and return RTK Query error format
    console.error('Network error:', error);
    return { error: 'Network connection failed' };
  }
}
