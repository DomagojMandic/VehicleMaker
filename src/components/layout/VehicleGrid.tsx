import { type PropsWithChildren } from 'react';
import StyledVehicleGridCompound from './StyledVehicleGrid';

// Main component with TypeScript props
type VehicleGridProps = PropsWithChildren;

function VehicleGrid({ children }: VehicleGridProps) {
  return (
    <StyledVehicleGridCompound>
      <StyledVehicleGridCompound.Grid>
        {children}
      </StyledVehicleGridCompound.Grid>
    </StyledVehicleGridCompound>
  );
}

export default VehicleGrid;
