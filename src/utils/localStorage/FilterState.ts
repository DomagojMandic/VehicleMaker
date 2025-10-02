const VEHICLE_MAKE_FILTERS_KEY = 'vehicleMakeFilters';
const VEHICLE_MODEL_FILTERS_KEY = 'vehicleModelFilters';

export interface FilterState {
  filterByInput?: string; // MODEL
  filterBySelect?: string; // MODEL
  filterBy?: string; // MAKE
  sortBy?: string; // BOTH
  page?: string; // BOTH
}

/* These functions will be used in VehicleModel and VehicleMake to maintain localstorage state before
falling back to default values. They will also be utilized in comparisons.

*/

export const saveFilters = (key: string, filters: FilterState): void => {
  try {
    localStorage.setItem(key, JSON.stringify(filters));
  } catch (error) {
    // localStorage might be full or disabled
  }
};

export const loadFilters = (key: string): FilterState | null => {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : null;
  } catch (error) {
    return null;
  }
};

export { VEHICLE_MAKE_FILTERS_KEY, VEHICLE_MODEL_FILTERS_KEY };
