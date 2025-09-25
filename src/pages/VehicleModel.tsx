import { useSearchParams } from 'react-router';

import VehicleGrid from '../components/layout/VehicleGrid';
import StyledVehicleGridCompound from '../components/layout/StyledVehicleGrid';
import LoadingSpinner from '../components/UI/LoadingSpinner/LoadingSpinner';
import Pagination from '../components/UI/Pagination/Pagination';

import { useGetVehicleModelsQuery } from '../store/vehicleApiSlice';

function VehicleModel() {
  const [searchParams] = useSearchParams();

  /* We destructure the query so that we have direct access to VehicleMakes Array */
  const {
    data: { items: vehicleModels, count } = { items: [], count: 0 },
    isLoading,
  } = useGetVehicleModelsQuery({
    page: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
  });

  if (isLoading) {
    return <LoadingSpinner text="Loading models" />;
  }

  return (
    <>
      <VehicleGrid>
        {vehicleModels?.map((model) => (
          <StyledVehicleGridCompound.Card
            key={model.id}
            to={`/vehicle/model/${model.id}`}
          >
            <StyledVehicleGridCompound.Content>
              <StyledVehicleGridCompound.Title>
                {model.name}
              </StyledVehicleGridCompound.Title>
              <StyledVehicleGridCompound.Subtitle>
                {model.abrv}
              </StyledVehicleGridCompound.Subtitle>
            </StyledVehicleGridCompound.Content>
          </StyledVehicleGridCompound.Card>
        ))}
      </VehicleGrid>
      <Pagination totalVehicles={count} />
    </>
  );
}

export default VehicleModel;
