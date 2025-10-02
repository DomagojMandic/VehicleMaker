import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useForm, type FieldErrors } from 'react-hook-form';

import { toast } from 'react-hot-toast';

import {
  useCreateVehicleModelMutation,
  useGetVehicleMakesQuery,
  useGetVehicleModelByIdQuery,
  useUpdateVehicleModelMutation,
} from '../store/vehicleApiSlice';

import FormBase, { FormRow } from '../components/layout/FormBase';
import LoadingSpinner from '../components/UI/LoadingSpinner/LoadingSpinner';

import { modelFormTemplate } from '../utils/formTemplates/modelFormTemplate';
import { renderModelInputField } from '../utils/formTemplates/renderFunctions';
import Button from '../components/UI/Button/Button';
import { onError } from '../utils/errorHandling/errorFormHandlers';
import { getModelValidations } from '../utils/helpers/helpers';

/* REACT HOOK FORM IN STEPS */
/* 
1) We define Formfields that represent the structure of our form. Each form input field
that we want to manage should have an entry in this type.

Step 2) is in modelFormTemplate.tsx where we define the template for our form.
 */
export type FormFields = {
  name: string;
  abrv: string;
  makeId: string;
};

const gridTemplateAreas = `
    "edit edit"
    "name name"
    "name-input name-input"
    "abrv abrv"
    "abrv-input abrv-input"
    "makeId makeId"
    "makeId-input makeId-input"
    "button button"
`;

function ModelEntity() {
  const [isEditing, setIsEditing] = useState(false);

  const { vehicleItemId } = useParams();
  const navigate = useNavigate();
  const [isCreateMode, setIsCreateMode] = useState(vehicleItemId === 'new');

  // We are detecting if we are in create mode or edit mode

  // Fetch the vehicle model by ID
  const { data: vehicleModel, isLoading: isLoadingModel } =
    useGetVehicleModelByIdQuery({
      id: vehicleItemId || '',
    });

  // Destructure the mutation hook and creating state from a tuple
  const [updateVehicleModel, { isLoading: isUpdating }] =
    useUpdateVehicleModelMutation();

  const [createVehicleModel, { isLoading: isCreating }] =
    useCreateVehicleModelMutation();

  // Fetching available vehicle makes for the select input
  const { data: { items: vehicleMakes } = { items: [] } } =
    useGetVehicleMakesQuery({ page: undefined });

  // Initialize form only after data is available
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty },
  } = useForm<FormFields>({
    defaultValues: {
      name: '',
      abrv: '',
    },
  });

  /* Here we get an objects with properties for each form field that corresponds to the 
  field name */

  const validations = getModelValidations(
    isCreateMode,
    'VehicleModel',
    vehicleModel,
  );

  function handleEdit() {
    if (isEditing) {
      const initialData = {
        name: vehicleModel?.name || '',
        abrv: vehicleModel?.abrv || '',
        makeId: String(vehicleModel?.makeId || ''),
      };
      reset(initialData);
    }
    setIsEditing((prev) => !prev);
  }

  function handleErrors(receivedError: FieldErrors<FormFields>) {
    onError(receivedError);
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
    navigate('/models');
  }

  function onSubmit(data: FormFields) {
    if (isCreateMode) {
      const newVehicleModel = {
        name: data.name,
        abrv: data.abrv,
        makeId: Number(data.makeId),
      };

      createVehicleModel(newVehicleModel).then(
        ({ data: createdModel, error }) => {
          if (error) {
            const errorMessage =
              typeof error === 'string' ? error : 'Unknown error';
            const fieldError: FieldErrors<FormFields> = {
              name: { type: 'manual', message: errorMessage },
              abrv: { type: 'manual', message: errorMessage },
              makeId: { type: 'manual', message: errorMessage },
            };
            onError(fieldError);
            return;
          }

          if (createdModel && !error) {
            toast.success('Vehicle model created successfully', {
              position: 'top-center',
            });
            setIsCreateMode(false);
            navigate(`/vehicle/model/${createdModel.id}`);
          }
        },
      );
    }

    if (!isCreateMode) {
      if (!isDirty) {
        toast.error('No changes were made to the form', {
          position: 'top-center',
        });
        setIsEditing(false);
        return;
      }

      const updatedModel = {
        id: vehicleModel!.id,
        created_at: vehicleModel!.created_at,
        name: data.name,
        abrv: data.abrv,
        makeId: Number(data.makeId),
      };

      // Call the mutation function to update the vehicle model

      updateVehicleModel(updatedModel).then(
        ({ data: vehicleModelDb, error }) => {
          if (error) {
            onError(error as FieldErrors<FormFields>);
          }

          if (vehicleModelDb && !error) {
            setIsEditing(false);
            toast.success('Model updated successfully', {
              position: 'top-center',
            });
          }
        },
      );
    }
  }

  const isDisabled = isEditing && !isSubmitting && !isUpdating;

  /*  Updates defaultValues when API data arrives, vehicleModel changes or current
      vehicleModel data changes
  */

  useEffect(() => {
    if (vehicleModel) {
      reset({
        name: vehicleModel.name,
        abrv: vehicleModel.abrv,
        makeId: String(vehicleModel.makeId),
      });
    }
  }, [vehicleModel, reset]);

  // Set editing state for create mode
  useEffect(() => {
    if (isCreateMode) {
      setIsEditing(true);
    }
  }, [isCreateMode]);

  return (
    <>
      {isLoadingModel && <LoadingSpinner text="Loading current model" />}

      {isCreateMode && <h1>Create New Vehicle Model</h1>}

      {(isCreateMode || vehicleModel) && (
        <FormBase
          onSubmit={handleSubmit(onSubmit, handleErrors)}
          $gridColumnAreas={gridTemplateAreas}
        >
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
          {modelFormTemplate.map((field) =>
            renderModelInputField(
              field,
              register,
              isDisabled,
              vehicleMakes,
              validations,
            ),
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
    </>
  );
}

export default ModelEntity;
