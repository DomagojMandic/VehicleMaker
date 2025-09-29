/* =============================== TYPES =============================== */
/* TypeScript interface defining shape of VehicleMake data from database */

export type Vehicle = VehicleMake | VehicleModel;

export type VehicleMake = {
  id: number;
  name: string;
  abrv: string;
  created_at: string; // Supabase timestamp format
};

export type CreateVehicleMake = {
  name: string;
  abrv: string;
};

export type CreateVehicleModel = {
  name: string;
  abrv: string;
  makeId: number;
};

export type VehicleModelDb = {
  id: string;
  name: string;
  abrv: string;
  makeId: number;
  created_at: string;
};

export type VehicleModel = VehicleModelDb & {
  carMaker: string;
};

export type VehicleModelNotFlat = Omit<VehicleModel, 'carMaker'> & {
  VehicleMake: {
    name: string;
  };
};
