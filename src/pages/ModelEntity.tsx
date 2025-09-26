import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useForm } from 'react-hook-form';

import {
  useGetVehicleMakesQuery,
  useGetVehicleModelByIdQuery,
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

  // Fetching available vehicle makes for the select input
  const { data: { items: vehicleMakes } = { items: [] } } =
    useGetVehicleMakesQuery({ page: undefined });

  // Initialize form only after data is available
  const { register, handleSubmit, reset } = useForm<FormFields>({
    defaultValues: {
      name: '',
      abrv: '',
    },
  });

  function handleEdit() {
    setIsEditing((prev) => !prev);
  }

  function onSubmit(data: FormFields) {
    console.log('Form submitted with data:', data);
  }

  /*  Updates defaultValues when API data arrives, vehicleModel changes or current
      vehicleModel data changes
  */

  useEffect(() => {
    if (vehicleModel) {
      reset({
        name: vehicleModel.name,
        abrv: vehicleModel.abrv,
      });
    }
  }, [vehicleModel, reset]);

  return (
    <>
      {isLoadingModel && <LoadingSpinner text="Loading current model" />}

      {vehicleModel && (
        <FormBase
          onSubmit={handleSubmit(onSubmit, onError)}
          $gridColumnAreas={gridTemplateAreas}
        >
          <FormRow $area="edit">
            <Button $size="large" onClick={() => handleEdit()}>
              {isEditing ? 'Cancel editing' : 'Edit'}
            </Button>
          </FormRow>
          {modelFormTemplate.map((field) =>
            renderModelInputField(field, register, isEditing, vehicleMakes),
          )}
          <FormRow $area="button">
            <Button type="submit" $size="large" disabled={!isEditing}>
              Submit
            </Button>
          </FormRow>
        </FormBase>
      )}
    </>
  );
}

export default ModelEntity;
