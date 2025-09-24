import { useParams } from 'react-router';

function VehicleItem() {
  const params = useParams();

  return (
    <div>
      VehicleItem: {params.type}/{params.vehicleItemId}
    </div>
  );
}

export default VehicleItem;
