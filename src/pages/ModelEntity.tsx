import { useParams } from 'react-router';

import { useGetVehicleMakesQuery } from '../store/vehicleApiSlice';

import FormBase, { FormRow } from '../components/layout/FormBase';
import LoadingSpinner from '../components/UI/LoadingSpinner/LoadingSpinner';
import Button from '../components/UI/Button/Button';

import { modelFormTemplate } from '../utils/formTemplates/modelFormTemplate';
import { renderModelInputField } from '../utils/formTemplates/renderFunctions';
import { useModelForm } from '../utils/helpers/useModelForm';
import DeleteVehicle from '../components/features/Modal/DeleteVehicle';

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
  const { vehicleItemId } = useParams();

  const {
    vehicleModel,
    isCreateMode,
    isLoadingModel,
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
  } = useModelForm(vehicleItemId || '');

  // We are detecting if we are in create mode or edit mode

  // Fetching available vehicle makes for the select input
  const { data: { items: vehicleMakes } = { items: [] } } =
    useGetVehicleMakesQuery({ page: undefined });

  /* Here we get an objects with properties for each form field that corresponds to the 
  field name */

  /*  Updates defaultValues when API data arrives, vehicleModel changes or current
      vehicleModel data changes
  */

  return (
    <>
      {isLoadingModel && <LoadingSpinner text="Loading current model" />}

      {isCreateMode && <h1>Create New Vehicle Model</h1>}

      {!isCreateMode && vehicleItemId && (
        <DeleteVehicle id={Number(vehicleItemId)} onDelete={handleDelete}>
          <p>Are you sure you want to delete this vehicle model?</p>
        </DeleteVehicle>
      )}

      {(isCreateMode || vehicleModel) && (
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
