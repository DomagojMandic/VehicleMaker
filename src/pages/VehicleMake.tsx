import StyledVehicleGridCompound from '../components/layout/StyledVehicleGrid';
import VehicleGrid from '../components/layout/VehicleGrid';

function VehicleMake() {
  return (
    <VehicleGrid>
      <StyledVehicleGridCompound.Card to="/vehicle/car/123">
        <StyledVehicleGridCompound.Content>
          <StyledVehicleGridCompound.Title>
            Porsche
          </StyledVehicleGridCompound.Title>
          <StyledVehicleGridCompound.Subtitle>
            911 Turbo S
          </StyledVehicleGridCompound.Subtitle>
          <StyledVehicleGridCompound.Details>
            992 Turbo S
          </StyledVehicleGridCompound.Details>
        </StyledVehicleGridCompound.Content>
      </StyledVehicleGridCompound.Card>
      <StyledVehicleGridCompound.Card to="/vehicle/car/123">
        <StyledVehicleGridCompound.Content>
          <StyledVehicleGridCompound.Title>
            Audi AG
          </StyledVehicleGridCompound.Title>
          <StyledVehicleGridCompound.Subtitle>
            RennSport 7
          </StyledVehicleGridCompound.Subtitle>
          <StyledVehicleGridCompound.Details>
            RS7
          </StyledVehicleGridCompound.Details>
        </StyledVehicleGridCompound.Content>
      </StyledVehicleGridCompound.Card>
      <StyledVehicleGridCompound.Card to="/vehicle/car/123">
        <StyledVehicleGridCompound.Content>
          <StyledVehicleGridCompound.Title>
            Car Maker
          </StyledVehicleGridCompound.Title>
          <StyledVehicleGridCompound.Subtitle>
            Car Model
          </StyledVehicleGridCompound.Subtitle>
        </StyledVehicleGridCompound.Content>
      </StyledVehicleGridCompound.Card>
      <StyledVehicleGridCompound.Card to="/vehicle/car/123">
        <StyledVehicleGridCompound.Content>
          <StyledVehicleGridCompound.Title>
            Car Maker
          </StyledVehicleGridCompound.Title>
          <StyledVehicleGridCompound.Subtitle>
            Car Model
          </StyledVehicleGridCompound.Subtitle>
        </StyledVehicleGridCompound.Content>
      </StyledVehicleGridCompound.Card>
      <StyledVehicleGridCompound.Card to="/vehicle/car/123">
        <StyledVehicleGridCompound.Content>
          <StyledVehicleGridCompound.Title>
            Car Maker
          </StyledVehicleGridCompound.Title>
          <StyledVehicleGridCompound.Subtitle>
            Car Model
          </StyledVehicleGridCompound.Subtitle>
        </StyledVehicleGridCompound.Content>
      </StyledVehicleGridCompound.Card>
      <StyledVehicleGridCompound.Card to="/vehicle/car/123">
        <StyledVehicleGridCompound.Content>
          <StyledVehicleGridCompound.Title>
            Car Maker
          </StyledVehicleGridCompound.Title>
          <StyledVehicleGridCompound.Subtitle>
            Car Model
          </StyledVehicleGridCompound.Subtitle>
        </StyledVehicleGridCompound.Content>
      </StyledVehicleGridCompound.Card>
    </VehicleGrid>
  );
}

export default VehicleMake;
