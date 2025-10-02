import { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router';
import { useForm, type FieldErrors } from 'react-hook-form';

import { toast } from 'react-hot-toast';

import {
  useGetVehicleMakeQuery,
  useGetVehicleModelsByMakeQuery,
  useUpdateVehicleMakeMutation,
  useCreateVehicleMakeMutation,
} from '../store/vehicleApiSlice';

import { makeFormTemplate } from '../utils/formTemplates/modelFormTemplate';

import VehicleGrid from '../components/layout/VehicleGrid';
import StyledVehicleGridCompound from '../components/layout/StyledVehicleGrid';
import LoadingSpinner from '../components/UI/LoadingSpinner/LoadingSpinner';
import FormBase, { FormRow } from '../components/layout/FormBase';
import { renderMakeInputField } from '../utils/formTemplates/renderFunctions';
import Button from '../components/UI/Button/Button';
import { onError } from '../utils/errorHandling/errorFormHandlers';
// import Pagination from '../components/UI/Pagination/Pagination';
import { getMakeValidations } from '../utils/helpers/helpers';

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
  const navigate = useNavigate();

  const { vehicleItemId } = useParams();
  const [searchParams] = useSearchParams();

  // We are detecting if we are in create mode or edit mode
  const isCreateMode = vehicleItemId === 'new';

  /* Fetch functions */

  const { data: vehicleMake, isLoading: isLoadingVehicle } =
    useGetVehicleMakeQuery(
      {
        id: vehicleItemId || '',
      },
      { skip: !vehicleItemId || isCreateMode },
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
      skip: !vehicleItemId || isCreateMode,
    },
  );

  /* Update Function */

  const [updateVehicleMake, { isLoading: isUpdating }] =
    useUpdateVehicleMakeMutation();

  /* Create Function */
  const [createVehicleMake, { isLoading: isCreating }] =
    useCreateVehicleMakeMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty },
  } = useForm<MakeFormFields>({
    defaultValues: {
      name: '',
      abrv: '',
    },
  });

  const validations = getMakeValidations(
    isCreateMode,
    'VehicleMake',
    vehicleMake,
  );

  function handleEdit() {
    if (isEditing) {
      const initialData = {
        name: vehicleMake?.name || '',
        abrv: vehicleMake?.abrv || '',
      };
      reset(initialData);
    }
    setIsEditing((prev) => !prev);
  }

  // Handle cancel for create mode
  function handleCancel() {
    if (isDirty) {
      // eslint-disable-next-line
      const confirmLeave = window.confirm(
        'You have unsaved changes. Are you sure you want to leave?',
      );
      if (!confirmLeave) return;
    }
    navigate('/makes');
  }

  function onSubmit(data: MakeFormFields) {
    // Create mode logic
    if (isCreateMode) {
      const newVehicleMake = {
        name: data.name.trim(),
        abrv: data.abrv.trim(),
      };

      createVehicleMake(newVehicleMake).then(({ data: createdMake, error }) => {
        if (error) {
          const errorMessage =
            typeof error === 'string' ? error : 'Unknown error';

          const fieldError: FieldErrors<MakeFormFields> = {
            name: { type: 'manual', message: errorMessage },
            abrv: { type: 'manual', message: errorMessage },
          };
          onError(fieldError);
          return;
        }

        if (createdMake && !error) {
          toast.success('Vehicle make created successfully');
          // Navigate to edit page of newly created make
          navigate(`/vehicle/make/${createdMake.id}`);
        }
      });
      return;
    }

    // Edit mode logic

    if (!isCreateMode) {
      if (!isDirty) {
        toast.error('No changes made to submit');
        setIsEditing(false);
        return;
      }

      const updatedVehicleMake = {
        id: vehicleMake!.id,
        created_at: vehicleMake!.created_at,
        name: data.name,
        abrv: data.abrv,
      };

      updateVehicleMake(updatedVehicleMake).then(
        ({ data: updatedMake, error }) => {
          if (error) {
            onError(error as FieldErrors<MakeFormFields>);
          }

          if (updatedMake && !error) {
            toast.success('Vehicle make updated successfully');
            reset(updatedMake);
            setIsEditing(false);
          }
        },
      );
    }
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

  // Set editing state for create mode
  useEffect(() => {
    if (isCreateMode) {
      setIsEditing(true);
    }
  }, [isCreateMode]);

  const isDisabled = isEditing && !isSubmitting && !isUpdating;

  return (
    /* Form that will always render for VehicleMakes */
    <>
      {isLoadingVehicle && <LoadingSpinner text="Loading current make" />}

      {/* Create mode heading */}
      {isCreateMode && <h1>Create New Vehicle Make</h1>}

      {/* Show form in create mode OR when vehicleMake is loaded in edit mode */}
      {(isCreateMode || vehicleMake) && (
        <FormBase
          onSubmit={handleSubmit(onSubmit, onError)}
          $gridColumnAreas={gridTemplateAreas}
        >
          {/* Hide edit button in create mode */}
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
            {/* Different buttons for creating and editing modes */}
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
                  onClick={() => handleCancel()}
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

      {/* If a Vehicle Make has corresponding Cars, they will be displayed in a grid, but only in edit mode */}

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
          {/* Commented out because not in use and expects additional params */}

          {/* <Pagination totalVehicles={modelCount} /> */}
        </>
      )}
    </>
  );
}

export default MakeEntity;
