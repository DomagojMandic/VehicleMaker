import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router';
import { useForm } from 'react-hook-form';

import {
  useGetVehicleMakeQuery,
  useGetVehicleModelsByMakeQuery,
} from '../store/vehicleApiSlice';

import { makeFormTemplate } from '../utils/formTemplates/modelFormTemplate';

import VehicleGrid from '../components/layout/VehicleGrid';
import StyledVehicleGridCompound from '../components/layout/StyledVehicleGrid';
import LoadingSpinner from '../components/UI/LoadingSpinner/LoadingSpinner';
import FormBase, { FormRow } from '../components/layout/FormBase';
import { renderMakeInputField } from '../utils/formTemplates/renderFunctions';
import Button from '../components/UI/Button/Button';
import { onError } from '../utils/errorHandling/errorFormHandlers';

const gridTemplateAreas = `
    "edit edit"
    "name name"
    "name-input name-input"
    "abrv abrv"
    "abrv-input abrv-input"
    "button button"
`;

export type MakeFormFields = {
  name: string;
  abrv: string;
};

function MakeEntity() {
  const [isEditing, setIsEditing] = useState(false);

  const { vehicleItemId } = useParams();
  const [searchParams] = useSearchParams();

  const { data: vehicleMake, isLoading: isLoadingVehicle } =
    useGetVehicleMakeQuery(
      {
        id: vehicleItemId || '',
      },
      { skip: !vehicleItemId },
    );

  const {
    data: { items: vehicleModelsById, count: modelCount } = {
      items: [],
      count: 0,
    },
    isLoading: isLoadingModels,
  } = useGetVehicleModelsByMakeQuery(
    {
      makeId: vehicleItemId || '',
      page: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
    },
    {
      skip: !vehicleItemId,
    },
  );

  const { register, handleSubmit, reset } = useForm<MakeFormFields>({
    defaultValues: {
      name: '',
      abrv: '',
    },
  });

  function handleEdit() {
    setIsEditing((prev) => !prev);
  }

  function onSubmit(data: MakeFormFields) {
    console.log('Form submitted with data:', data);
  }

  /*  Updates defaultValues when API data arrives, vehicleModel changes or current
      vehicleModel data changes
  */

  useEffect(() => {
    if (vehicleMake) {
      reset({
        name: vehicleMake.name,
        abrv: vehicleMake.abrv,
      });
    }
  }, [vehicleMake, reset]);

  return (
    /* Form that will always render, for VehicleMakes and VehicleModels */
    <>
      {isLoadingVehicle && <LoadingSpinner text="Loading current make" />}

      {isLoadingModels && (
        <LoadingSpinner text="Loading models for this make" />
      )}

      {vehicleMake && (
        <FormBase
          onSubmit={handleSubmit(onSubmit, onError)}
          $gridColumnAreas={gridTemplateAreas}
        >
          <FormRow $area="edit">
            <Button $size="large" onClick={() => handleEdit()}>
              {isEditing ? 'Cancel editing' : 'Edit'}
            </Button>
          </FormRow>
          {makeFormTemplate.map((field) =>
            renderMakeInputField(field, register, isEditing),
          )}
          <FormRow $area="button">
            <Button type="submit" $size="large" disabled={!isEditing}>
              Submit
            </Button>
          </FormRow>
        </FormBase>
      )}

      {/* If a Vehicle Make has corresponding Cars, they will be displayed in a grid */}

      {modelCount > 0 && (
        <VehicleGrid>
          {vehicleModelsById?.map((model) => (
            <StyledVehicleGridCompound.Card
              key={model.id}
              to={`/vehicle/model/${model.id}`}
            >
              <StyledVehicleGridCompound.Content>
                <StyledVehicleGridCompound.Title>
                  {model.carMaker}
                </StyledVehicleGridCompound.Title>
                <StyledVehicleGridCompound.Subtitle>
                  {model.name}
                </StyledVehicleGridCompound.Subtitle>
                <StyledVehicleGridCompound.Details>
                  {model.abrv}
                </StyledVehicleGridCompound.Details>
              </StyledVehicleGridCompound.Content>
            </StyledVehicleGridCompound.Card>
          ))}
        </VehicleGrid>
      )}
    </>
  );
}

export default MakeEntity;
