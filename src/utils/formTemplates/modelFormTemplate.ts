// src/utils/formTemplates/modelFormTemplate.ts
import type { Path, RegisterOptions } from 'react-hook-form';
import type { FormFields } from '../../pages/ModelEntity';
import type { MakeFormFields } from '../../pages/MakeEntity';

/* ====================================== MODEL ENTITY TEMPLATE =================================== */

/* REACT HOOK FORM IN STEPS */

/*
   Step 1) is in ModelEntity.tsx - ln15

  2) Field types that matches our current template shape.
  We type validation as RegisterOptions<FormFields, Path<FormFields>> so that validation
  shapes are compatible with react-hook-form.

  RegisterOptions defines the ruleset for validating one field.
  By using FormFields as the first generic type, we define the shape of our entire form.

  By using Path<FormFields> as the second generic type, we ensure that the field name must be
  one of the keys of FormFields.

  Step 3) is lower in the file.
 */
export type ModelFormField = {
  name: keyof FormFields; // "name" | "abrv" - ensures us that name is always a valid key of FormFields
  label: string;
  type: string;
  disabled: boolean;
  placeholder: string;
  validation?: RegisterOptions<FormFields, Path<FormFields>>;
};

/* REACT HOOK FORM IN STEPS */

/* 
    3) Now that we have our field type defined, we created our own form template. 

    Step 4) is in renderFunctions.tsx
*/

export const modelFormTemplate: ModelFormField[] = [
  {
    name: 'name',
    label: 'Model Name',
    type: 'text',
    placeholder: 'Enter model name',
    disabled: true,
    validation: {
      required: 'Model name is required',
      minLength: {
        value: 2,
        message: 'Model name must be at least 2 characters',
      },
      maxLength: {
        value: 30,
        message: 'Model name must be at most 30 characters',
      },
    },
  },
  {
    name: 'abrv',
    label: 'Abbreviation',
    type: 'text',
    placeholder: 'Enter abbreviation',
    disabled: true,

    validation: {
      required: 'Abbreviation is required',
      minLength: {
        value: 1,
        message: 'Abbreviation must be at least 1 character',
      },
      maxLength: {
        value: 15,
        message: 'Abbreviation must be at most 15 characters',
      },
    },
  },
  {
    name: 'makeId',
    label: 'Select Make',
    type: 'select',
    placeholder: 'Select a make',
    disabled: true,
    validation: {
      required: 'Make selection is required',
    },
  },
];

/* ====================================== MAKE ENTITY TEMPLATE =================================== */

export type MakeFormField = {
  name: keyof MakeFormFields;
  label: string;
  type: string;
  disabled: boolean;
  placeholder: string;
  validation?: RegisterOptions<MakeFormFields, Path<MakeFormFields>>;
};

export const makeFormTemplate: MakeFormField[] = [
  {
    name: 'name',
    label: 'Manufacturer Name',
    type: 'text',
    placeholder: 'Enter make name',
    disabled: true,
    validation: {
      required: 'Make name is required',
      minLength: {
        value: 2,
        message: 'Make name must be at least 2 characters',
      },
      maxLength: {
        value: 30,
        message: 'Make name must be at most 30 characters',
      },
    },
  },
  {
    name: 'abrv',
    label: 'Abbreviation',
    type: 'text',
    placeholder: 'Enter abbreviation',
    disabled: true,
    validation: {
      required: 'Abbreviation is required',
      minLength: {
        value: 1,
        message: 'Abbreviation must be at least 1 character',
      },
      maxLength: {
        value: 15,
        message: 'Abbreviation must be at most 15 characters',
      },
    },
  },
];
