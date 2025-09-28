import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useForm, type FieldErrors } from 'react-hook-form';

import { toast } from 'react-hot-toast';

import {
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

  // Fetch the vehicle model by ID
  const { data: vehicleModel, isLoading: isLoadingModel } =
    useGetVehicleModelByIdQuery({
      id: vehicleItemId || '',
    });

  // Destructure the mutation hook and creating state from a tuple
  const [updateVehicleModel, { isLoading: isUpdating }] =
    useUpdateVehicleModelMutation();

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

  function onSubmit(data: FormFields) {
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

    updateVehicleModel(updatedModel).then(({ data: vehicleModelDb, error }) => {
      if (error) {
        onError(error as FieldErrors<FormFields>);
      }

      if (vehicleModelDb && !error) {
        setIsEditing(false);
        toast.success('Model updated successfully', {
          position: 'top-center',
        });
      }
    });
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

  return (
    <>
      {isLoadingModel && <LoadingSpinner text="Loading current model" />}

      {vehicleModel && (
        <FormBase
          onSubmit={handleSubmit(onSubmit, handleErrors)}
          $gridColumnAreas={gridTemplateAreas}
        >
          <FormRow $area="edit">
            <Button
              $size="large"
              onClick={() => handleEdit()}
              disabled={isUpdating || isSubmitting}
            >
              {isEditing ? 'Cancel editing' : 'Edit'}
            </Button>
          </FormRow>
          {modelFormTemplate.map((field) =>
            renderModelInputField(field, register, isDisabled, vehicleMakes),
          )}
          <FormRow $area="button">
            <Button type="submit" $size="large" disabled={!isDisabled}>
              Submit
            </Button>
          </FormRow>
        </FormBase>
      )}
    </>
  );
}

export default ModelEntity;
