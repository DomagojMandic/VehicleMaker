import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useForm, type FieldErrors } from 'react-hook-form';

import { toast } from 'react-hot-toast';

import {
  useCreateVehicleModelMutation,
  useDeleteVehicleModelMutation,
  useGetVehicleModelByIdQuery,
  useUpdateVehicleModelMutation,
} from '../../store/vehicleApiSlice';

import { onError } from '../errorHandling/errorFormHandlers';
import { getModelValidations } from '../helpers/helpers';
import type { FormFields } from '../../pages/ModelEntity';

/* REACT HOOK FORM IN STEPS */
/* 
1) We define Formfields that represent the structure of our form. Each form input field
that we want to manage should have an entry in this type.

Step 2) is in modelFormTemplate.tsx where we define the template for our form.
 */

export const useModelForm = (vehicleItemId: string) => {
  const [isEditing, setIsEditing] = useState(false);

  /* This variable defines whether the form is in create mode or edit mode and conditionally renders
  the UI. */

  const [isCreateMode, setIsCreateMode] = useState(vehicleItemId === 'new');

  const navigate = useNavigate();

  // Fetch the vehicle model by ID
  const { data: vehicleModel, isLoading: isLoadingModel } =
    useGetVehicleModelByIdQuery(
      {
        id: vehicleItemId || '',
      },
      {
        skip: isCreateMode,
      },
    );

  // Destructure the mutation hook and creating state from a tuple
  const [updateVehicleModel, { isLoading: isUpdating }] =
    useUpdateVehicleModelMutation();

  const [createVehicleModel, { isLoading: isCreating }] =
    useCreateVehicleModelMutation();

  const [deleteVehicleModel, { isLoading: isDeleting }] =
    useDeleteVehicleModelMutation();

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
      makeId: '',
    },
  });

  const isDisabled = isEditing && !isSubmitting && !isUpdating;

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

  // Handle cancel for create mode
  function handleCancel() {
    if (isDirty) {
      /* This is left in because this was seen on many of the sites I use on a daily basis */
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
        name: data.name.trim(),
        abrv: data.abrv.trim(),
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

  function handleDelete(id: number) {
    deleteVehicleModel({ id }).then(({ data: deletedModel, error }) => {
      if (error) {
        onError(error as FieldErrors<FormFields>);
        return;
      }

      if (deletedModel && !error) {
        toast.success(`Model ${deletedModel.name} deleted successfully`, {
          position: 'top-center',
        });
        navigate('/models');
      }
    });
  }

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

  return {
    vehicleModel,
    isCreateMode,
    isLoadingModel,
    isUpdating,
    isCreating,
    isDeleting,
    register,
    handleSubmit: handleSubmit(onSubmit, onError),
    handleDelete,
    isEditing,
    isSubmitting,
    isDirty,
    isDisabled,
    handleEdit,
    handleCancel,
    validations,
  };
};
