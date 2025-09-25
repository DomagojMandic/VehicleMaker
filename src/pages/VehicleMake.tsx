import { useSearchParams } from 'react-router';
import StyledVehicleGridCompound from '../components/layout/StyledVehicleGrid';
import VehicleGrid from '../components/layout/VehicleGrid';
import LoadingSpinner from '../components/UI/LoadingSpinner/LoadingSpinner';
import Pagination from '../components/UI/Pagination/Pagination';
import { useGetVehicleMakesQuery } from '../store/vehicleApiSlice';

function VehicleMake() {
  const [searchParams] = useSearchParams();

  /* We destructure the query so that we have direct access to VehicleMakes Array */
  const {
    data: { items: vehicleMakes, count } = { items: [], count: 0 },
    isLoading,
  } = useGetVehicleMakesQuery({
    page: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
  });

  if (isLoading) {
    return <LoadingSpinner text="Loading models" />;
  }

  return (
    <>
      <VehicleGrid>
        {vehicleMakes?.map((make) => (
          <StyledVehicleGridCompound.Card
            key={make.id}
            to={`/vehicle/make/${make.id}`}
          >
            <StyledVehicleGridCompound.Content>
              <StyledVehicleGridCompound.Title>
                {make.name}
              </StyledVehicleGridCompound.Title>
              <StyledVehicleGridCompound.Subtitle>
                {make.abrv}
              </StyledVehicleGridCompound.Subtitle>
            </StyledVehicleGridCompound.Content>
          </StyledVehicleGridCompound.Card>
        ))}
      </VehicleGrid>
      <Pagination totalVehicles={count} />
    </>
  );
}

export default VehicleMake;
