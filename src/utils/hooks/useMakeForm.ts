// hooks/useMakeForm.ts
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { useForm, type FieldErrors } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import {
  useGetVehicleMakeQuery,
  useUpdateVehicleMakeMutation,
  useCreateVehicleMakeMutation,
  useDeleteVehicleMakeMutation,
} from '../../store/vehicleApiSlice';

import { onError } from '../errorHandling/errorFormHandlers';
import type { MakeFormFields } from '../../pages/MakeEntity';
import { getMakeValidations } from '../helpers/helpers';

/* This form contains all the logic behind the Vehicle Make Form.
   The values extracted from this return has the necessary functions, data and state
   needed for controlling the inputs and form events with validation.
   */

export const useMakeForm = (vehicleItemId: string) => {
  const [isEditing, setIsEditing] = useState(false);
  /* This variable defines whether the form is in create mode or edit mode and conditionally renders
  the UI. */
  const [isCreateMode, setIsCreateMode] = useState(vehicleItemId === 'new');
  const navigate = useNavigate();

  const { data: vehicleMake, isLoading: isLoadingVehicle } =
    useGetVehicleMakeQuery(
      { id: vehicleItemId || '' },
      { skip: !vehicleItemId || isCreateMode },
    );

  /* CRUD functions and its loading states. */
  const [updateVehicleMake, { isLoading: isUpdating }] =
    useUpdateVehicleMakeMutation();
  const [createVehicleMake, { isLoading: isCreating }] =
    useCreateVehicleMakeMutation();
  const [deleteVehicleMake, { isLoading: isDeleting }] =
    useDeleteVehicleMakeMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting, isDirty },
  } = useForm({
    defaultValues: { name: '', abrv: '' },
  });

  const validations = getMakeValidations(
    isCreateMode,
    'VehicleMake',
    vehicleMake,
  );

  /* Function that handles the editing state and resets the state to the initial values 
  if the user cancels editing. 
  */

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

  /* This functions should only be used with the create mode because it redirects the user back
   */

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

  /* The submission function that handles the update of the VehicleMake table. The exported version
  is already called with 2 arguments so we can use it instantly.
  */
  function onSubmit(data: MakeFormFields) {
    /* If we are in create mode, we can only add new makes */
    if (isCreateMode) {
      const newVehicleMake = {
        name: data.name.trim(),
        abrv: data.abrv.trim(),
      };

      createVehicleMake(newVehicleMake).then(({ data: createdMake, error }) => {
        if (error) {
          const errorMessage =
            typeof error === 'string' ? error : 'Unknown error';
          const fieldError = {
            name: { type: 'manual', message: errorMessage },
            abrv: { type: 'manual', message: errorMessage },
          };
          onError(fieldError);
          return;
        }

        if (createdMake && !error) {
          toast.success('Vehicle make created successfully');
          setIsCreateMode(false);
          navigate(`/vehicle/make/${createdMake.id}`);
        }
      });
      return;
    }

    /* If we are in edit mode, we can only edit existing makes */

    if (!isCreateMode) {
      if (!isDirty) {
        toast.error('No changes made to submit');
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

  function handleDelete(id: number) {
    deleteVehicleMake({ id }).then(({ data: deletedModel, error }) => {
      if (error) {
        onError(error as FieldErrors<MakeFormFields>);
        return;
      }

      if (deletedModel && !error) {
        toast.success(
          `Make ${deletedModel.name} and its models have been deleted successfully`,
          {
            position: 'top-right',
          },
        );
        navigate('/makes');
      }
    });
  }

  useEffect(() => {
    if (vehicleMake) {
      reset({
        name: vehicleMake.name,
        abrv: vehicleMake.abrv,
      });
    }
  }, [vehicleMake, reset]);

  useEffect(() => {
    if (isCreateMode) {
      setIsEditing(true);
    }
  }, [isCreateMode]);

  const isDisabled = isEditing && !isSubmitting && !isUpdating;

  return {
    vehicleMake,
    isCreateMode,
    isLoadingVehicle,
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
