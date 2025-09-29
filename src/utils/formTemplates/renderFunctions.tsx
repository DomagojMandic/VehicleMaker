import React from 'react';

import type { UseFormRegister, Path } from 'react-hook-form';

import { FormRow } from '../../components/layout/FormBase';
import FormLabel from '../../components/UI/Label/FormLabel';
import FormInput from '../../components/UI/Inputs/FormInput';

import type { ModelFormField, MakeFormField } from './modelFormTemplate';

import type { FormFields } from '../../pages/ModelEntity';
import type { MakeFormFields } from '../../pages/MakeEntity';
import FormSelect from '../../components/UI/Inputs/FormSelect';
import type { Vehicle } from '../../api/types';
import type { MakeValidations, ModelValidations } from '../helpers/helpers';

/* ====================================== MODEL ENTITY FUNCTION ================================= */

/* REACT HOOK FORM IN STEPS */
/*
   4) This function accepts two parameters, a field of type ModelFormField that we defined in modelFormTemplate and the register function.
   The register function is the exact function that we get from useForm<FormFields>(), but here it is the second argument and typed as one UseFormRegister.
   The additional type UseFormRegister receives is the exact same type of the available form fields so that it knows which form is it connected to.

   We use field.name as Path<FormFields> because register() expects its first argument to be of type Path<FormFields>.Even though field.name 
   is keyof FormFields ("name" | "abrv"), TypeScript cannot automatically infer it as Path<FormFields>.
    
 */
export function renderModelInputField(
  field: ModelFormField,
  register: UseFormRegister<FormFields>,
  disabled: boolean,
  vehicleMakes: Vehicle[],
  validations: ModelValidations,
) {
  const fieldValidation = validations[field.name];

  switch (field.type) {
    case 'text':
    case 'number':
      return (
        <React.Fragment key={`${String(field.name)}-fragment`}>
          <FormRow key={String(field.name)} $area={String(field.name)}>
            <FormLabel htmlFor={String(field.name)}>{field.label}</FormLabel>
          </FormRow>
          <FormRow
            key={`${String(field.name)}-input`}
            $area={`${String(field.name)}-input`}
          >
            <FormInput
              id={String(field.name)}
              type={field.type}
              placeholder={field.placeholder}
              disabled={!disabled}
              // Here we are casting name to Path<FormFields> so register signature matches exactly
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...register(field.name as Path<FormFields>, fieldValidation)}
            />
          </FormRow>
        </React.Fragment>
      );
    case 'select':
      return (
        <React.Fragment key={`${String(field.name)}-fragment`}>
          <FormRow key={String(field.name)} $area={String(field.name)}>
            <FormLabel htmlFor={String(field.name)}>{field.label}</FormLabel>
          </FormRow>
          <FormRow
            key={`${String(field.name)}-input`}
            $area={`${String(field.name)}-input`}
          >
            <FormSelect
              vehicleArray={vehicleMakes}
              disabled={!disabled}
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...register(field.name as Path<FormFields>, fieldValidation)}
            />
          </FormRow>
        </React.Fragment>
      );
    default:
      throw new Error(`Unsupported field type: ${field.type}`);
  }
}

/* ====================================== MAKE ENTITY FUNCTION ================================= */

export function renderMakeInputField(
  field: MakeFormField,
  register: UseFormRegister<MakeFormFields>,
  disabled: boolean,
  validations: MakeValidations,
) {
  const fieldValidation = validations[field.name];

  switch (field.type) {
    case 'text':
    case 'number':
      return (
        <React.Fragment key={`${String(field.name)}-fragment`}>
          <FormRow key={String(field.name)} $area={String(field.name)}>
            <FormLabel htmlFor={String(field.name)}>{field.label}</FormLabel>
          </FormRow>
          <FormRow
            key={`${String(field.name)}-input`}
            $area={`${String(field.name)}-input`}
          >
            <FormInput
              id={String(field.name)}
              type={field.type}
              placeholder={field.placeholder}
              disabled={!disabled}
              // Here we are casting name to Path<MakeFormFields> so register signature matches exactly
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...register(field.name as Path<MakeFormFields>, fieldValidation)}
            />
          </FormRow>
        </React.Fragment>
      );

    default:
      throw new Error(`Unsupported field type: ${field.type}`);
  }
}
