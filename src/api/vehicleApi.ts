import { PAGE_SIZE } from './constants';
import supabase from './supabase';
import type {
  CreateVehicleMake,
  CreateVehicleModel,
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

export type GetVehicleMakesParams = {
  page?: number;
  sortBy?: string;
  filterByInput?: string;
};

export type GetVehicleModelsParams = GetVehicleMakesParams & {
  filterBySelect?: string;
};

export type GetModelsByIdParams = {
  makeId: string;
  page?: number;
};

// RTK Query compatible function - returns { data } or { error }
export async function getAllVehicleMakes({
  page,
  sortBy,
  filterByInput,
}: GetVehicleMakesParams) {
  try {
    // Call Supabase to fetch all records from VehicleMake table
    let query = supabase
      .from('VehicleMake')
      /* Here we pass count as exact when we only need a certain amount of results */
      .select('*', { count: 'exact' }); // Select all columns

    /* FILTER BY USER INPUT LOGIC - it only makes sense to filter this by user input */

    /* This will be undefined if filterBy is not provided */
    const trimmedFilter = filterByInput?.trim();

    if (trimmedFilter) {
      query = query.or(
        `name.ilike.%${trimmedFilter}%,abrv.ilike.%${trimmedFilter}%`,
      );
    }

    /* SORT BY LOGIC - it only makes sense to sort this by name */

    const [fieldName, fieldDirection] = sortBy ? sortBy.split('-') : [];

    if (fieldName && fieldDirection) {
      query = query.order(fieldName, { ascending: fieldDirection === 'asc' });
    }

    if (page) {
      const from = (page - 1) * PAGE_SIZE; // Calculate starting index
      const to = from + PAGE_SIZE - 1;
      // Implement pagination logic if needed
      query = query.range(from, to); // Define range based on page and page size
    }

    const { data, error: vehicleMakeError, count } = await query;

    // Handle Supabase errors (object - we don't throw it so that RTK Query can handle it)
    if (vehicleMakeError) {
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
      return { error: error.message };
    }

    return { data: vehicleMake as VehicleMake };
  } catch (error) {
    return { error: 'Network connection failed' };
  }
}

export async function getMakeNames() {
  try {
    const { data, error } = await supabase.from('VehicleMake').select('name');

    if (error) {
      return { error: error.message };
    }
    return { data: data as { name: string }[] };
  } catch (error) {
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
    return { error: updateError.message };
  }

  return { data: updatedVehicle as VehicleMake };
}

export async function createMake(makeData: CreateVehicleMake) {
  const { data: newMake, error: createError } = await supabase
    .from('VehicleMake')
    .insert(makeData)
    .select()
    .single();

  if (createError) {
    return { error: createError.message };
  }

  return { data: newMake as VehicleMake };
}

/* Cascade delete is implemented in Supabase so we do not have to have an additional function
for deleting the individual Vehicle models, we will just invalidate them. */
export async function deleteMake(id: number) {
  const { data, error } = await supabase
    .from('VehicleMake')
    .delete()
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  return { data: data as VehicleMake };
}

/* ============================== VEHICLE MODELS ============================= */

export async function getAllVehicleModels({
  page,
  sortBy,
  filterByInput,
  filterBySelect,
}: GetVehicleModelsParams) {
  try {
    /* Here we changed to !inned(name) to support chaining .or better */
    let query = supabase
      .from('VehicleModel')
      .select('*, VehicleMake!inner(name)', { count: 'exact' });

    /* FILTER BY LOGIC - we will apply filters based on the provided parameters.
    First we will filter by make and then by model */

    if (filterBySelect) {
      query = query.eq('VehicleMake.name', filterBySelect);
    }

    const trimmedInputFilter = filterByInput?.trim();

    if (trimmedInputFilter) {
      query = query.or(
        `name.ilike.%${trimmedInputFilter}%,abrv.ilike.%${trimmedInputFilter}%`,
      );
    }

    /* SORT BY LOGIC - we will have two different kinds of parametes - make_ and model_ which
      will determine the sorting behavior. The user can only accept one of them. */

    const [fieldName, fieldDirection] = sortBy ? sortBy.split('-') : [];

    /* This is the only way based on Supabase Docs */

    if (fieldName === 'make' && fieldDirection) {
      query = query.order('VehicleMake(name)', {
        ascending: fieldDirection === 'asc',
      });
    }

    if (fieldName === 'model' && fieldDirection) {
      query = query.order('name', { ascending: fieldDirection === 'asc' });
    }

    if (page) {
      const from = (page - 1) * PAGE_SIZE;
      const to = from + PAGE_SIZE - 1;
      query = query.range(from, to);
    }

    const { data, error: vehicleModelError, count } = await query;

    const flattenedData = (data as VehicleModelNotFlat[])?.map((item) => {
      const { VehicleMake, ...rest } = item;
      return {
        ...rest,
        carMaker: VehicleMake?.name,
      };
    });

    // Handle Supabase errors (object - we don't throw it so that RTK Query can handle it)
    if (vehicleModelError) {
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
      return { error: error.message };
    }

    const { VehicleMake, ...rest } = vehicleModel;
    const flattenedVehicle = {
      ...rest,
      carMaker: VehicleMake.name,
    };

    return { data: flattenedVehicle as VehicleModel };
  } catch (error) {
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
    return { error: updateError.message };
  }

  return { data: updatedVehicle as VehicleModelDb };
}

export async function createModel(modelData: CreateVehicleModel) {
  const { data: newModel, error: createError } = await supabase
    .from('VehicleModel')
    .insert(modelData)
    .select()
    .single();

  if (createError) {
    return { error: createError.message };
  }

  return { data: newModel as VehicleModelDb };
}

export async function deleteModel(id: number) {
  const { data, error } = await supabase
    .from('VehicleModel')
    .delete()
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return { error: error.message };
  }

  return { data: data as VehicleModelDb };
}
