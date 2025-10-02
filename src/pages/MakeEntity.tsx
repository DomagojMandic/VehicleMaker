import { useParams, useSearchParams } from 'react-router';

import { useGetVehicleModelsByMakeQuery } from '../store/vehicleApiSlice';

import { makeFormTemplate } from '../utils/formTemplates/modelFormTemplate';
import { renderMakeInputField } from '../utils/formTemplates/renderFunctions';
import { useMakeForm } from '../utils/hooks/useMakeForm';

import VehicleGrid from '../components/layout/VehicleGrid';
import StyledVehicleGridCompound from '../components/layout/StyledVehicleGrid';
import LoadingSpinner from '../components/UI/LoadingSpinner/LoadingSpinner';
import FormBase, { FormRow } from '../components/layout/FormBase';
import Button from '../components/UI/Button/Button';
import Pagination from '../components/UI/Pagination/Pagination';
import DeleteVehicle from '../components/features/Modal/DeleteVehicle';

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

/* This component calls the custom useMakeForm and extracts all the 
necessary functions and state that we can use in rendering the UI and user
submissions */
function MakeEntity() {
  const { vehicleItemId } = useParams();
  const [searchParams] = useSearchParams();

  const {
    vehicleMake,
    isCreateMode,
    isLoadingVehicle,
    isUpdating,
    isCreating,
    register,
    handleSubmit,
    handleDelete,
    isEditing,
    isSubmitting,
    isDisabled,
    handleEdit,
    handleCancel,
    validations,
  } = useMakeForm(vehicleItemId || '');

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
      skip: !vehicleItemId || isCreateMode,
    },
  );

  return (
    <>
      {isLoadingVehicle && <LoadingSpinner text="Loading current make" />}

      {isCreateMode && <h1>Create New Vehicle Make</h1>}

      {!isCreateMode && vehicleItemId && (
        <DeleteVehicle id={Number(vehicleItemId)} onDelete={handleDelete}>
          <p>
            Are you sure you want to delete this vehicle model? It will delete
            all its correspoding models!
          </p>
        </DeleteVehicle>
      )}

      {(isCreateMode || vehicleMake) && (
        <FormBase onSubmit={handleSubmit} $gridColumnAreas={gridTemplateAreas}>
          {!isCreateMode && (
            <FormRow $area="edit">
              <Button
                $size="large"
                onClick={() => handleEdit()}
                disabled={isUpdating || isSubmitting}
              >
                {isEditing ? 'Cancel editing' : 'Edit'}
              </Button>
            </FormRow>
          )}

          {makeFormTemplate.map((field) =>
            renderMakeInputField(field, register, isDisabled, validations),
          )}

          <FormRow $area="button">
            {isCreateMode ? (
              <>
                <Button
                  type="submit"
                  $size="large"
                  disabled={isSubmitting || isCreating}
                >
                  {isCreating ? 'Creating...' : 'Create Make'}
                </Button>
                <Button
                  type="button"
                  $size="large"
                  onClick={handleCancel}
                  disabled={isSubmitting || isCreating}
                >
                  Cancel
                </Button>
              </>
            ) : (
              <Button type="submit" $size="large" disabled={!isDisabled}>
                Submit
              </Button>
            )}
          </FormRow>
        </FormBase>
      )}

      {isLoadingModels && (
        <LoadingSpinner text="Loading models for this make" />
      )}

      {!isCreateMode && modelCount > 0 && (
        <>
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
          <Pagination
            totalVehicles={modelCount}
            localStorageKey="VEHICLE_MAKE_FORM_KEY"
          />
        </>
      )}
    </>
  );
}

export default MakeEntity;
