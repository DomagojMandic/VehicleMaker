/* =============================== TYPES =============================== */
/* TypeScript interface defining shape of VehicleMake data from database */

export type VehicleMake = {
  id: number;
  name: string;
  abrv: string;
  created_at: string; // Supabase timestamp format
};

export type VehicleModel = {
  id: number;
  created_at: string; // Supabase timestamp format
  name: string;
  abrv: string;
  make_id: number;
};
