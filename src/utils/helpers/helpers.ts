import type {
  FieldErrors,
  FieldValues,
  RegisterOptions,
} from 'react-hook-form';
import { onError } from '../errorHandling/errorFormHandlers';
import supabase from '../../api/supabase';
import type { Vehicle } from '../../api/types';
import type { FormFields } from '../../pages/ModelEntity';
import type { MakeFormFields } from '../../pages/MakeEntity v1 - not in use';

export const trimString = (formValue: string): boolean => {
  const formattedString = formValue.trim();

  if (formattedString === '') {
    const errorObj: FieldErrors<FieldValues> = {
      name: {
        type: 'trim',
        message: 'Name cannot be empty or just spaces',
      },
    };
    onError(errorObj);
    return false;
  }
  return true;
};

/* This function compares form data with the current vehicle model values. If they are all the same, 
we can skip the update and return. 

We cannot use JSON.stringify because it is sensitive to key order, and we want to ignore that.

This function was used before adding validation to the form templates.
*/
export const formDataCompare = <T extends object>(
  data: T,
  originalData: T,
): boolean => {
  return (Object.keys(data) as Array<keyof T>).every((key) => {
    const valueA = data[key];
    const valueB = originalData[key];

    return typeof valueA === 'string' && typeof valueB === 'string'
      ? valueA.trim() === valueB.trim()
      : valueA === valueB;
  });
};

/* This function will be used for a special validation of the select input */

export const checkSelectNoChanges = (
  newValue: string,
  originalValue?: number,
): true | string => {
  // If the values are the same, return a toast message
  if (Number(newValue) === originalValue) {
    return 'No changes were made to the Make selection';
  }

  // If values are different, return true
  return true;
};

/* This function will be used as a validator on the database side */
export const validateDBUnique = async (
  value: string,
  db: 'VehicleMake' | 'VehicleModel',
  fieldName: string,
): Promise<true | string> => {
  try {
    const { data: found, error } = await supabase
      .from(db)
      .select('id')
      .ilike(fieldName, value.trim());

    if (error) {
      return 'Database validation failed';
    }

    if (found && found.length > 0) {
      return `Record with the same ${fieldName} already exists`;
    }

    return true;
  } catch (networkError) {
    return 'Network connection failed';
  }
};

/* These functions return validations for the form fields. In each of the
forms we extract the validation rules and then pass it into the render functions
that will map over each field and apply the validations */

export type ModelValidations = {
  [K in keyof FormFields]: RegisterOptions<FormFields, K>;
};

export type MakeValidations = {
  [K in keyof MakeFormFields]: RegisterOptions<MakeFormFields, K>;
};

export function getModelValidations(
  isCreateMode: boolean,
  dataTable: 'VehicleModel',
  currentVehicle?: Vehicle,
): ModelValidations {
  return {
    name: {
      required: 'Model name is required',
      minLength: {
        value: 2,
        message: 'Model name must be at least 2 characters',
      },
      maxLength: {
        value: 30,
        message: 'Model name must be at most 30 characters',
      },
      validate: {
        notEmpty: (value: string) =>
          value.trim() !== '' || 'Name cannot be empty or just spaces',
        uniqueName: async (value: string) => {
          if (!value.trim()) return true;
          if (!isCreateMode && value === currentVehicle?.name) return true;
          return validateDBUnique(value, dataTable, 'name');
        },
      },
    },
    abrv: {
      required: 'Abbreviation is required',
      minLength: {
        value: 1,
        message: 'Abbreviation must be at least 1 character',
      },
      maxLength: {
        value: 15,
        message: 'Abbreviation must be at most 15 characters',
      },
      validate: {
        notEmpty: (value: string) =>
          value.trim() !== '' || 'Abbreviation cannot be empty or just spaces',
        uniqueName: async (value: string) => {
          if (!value.trim()) return true;
          if (!isCreateMode && value === currentVehicle?.abrv) return true;
          return validateDBUnique(value, dataTable, 'abrv');
        },
      },
    },
    makeId: {
      required: 'Make selection is required',
    },
  };
}

export function getMakeValidations(
  isCreateMode: boolean,
  dataTable: 'VehicleMake',
  currentVehicle?: Vehicle,
): MakeValidations {
  return {
    name: {
      required: 'Model name is required',
      minLength: {
        value: 2,
        message: 'Model name must be at least 2 characters',
      },
      maxLength: {
        value: 30,
        message: 'Model name must be at most 30 characters',
      },
      validate: {
        notEmpty: (value: string) =>
          value.trim() !== '' || 'Name cannot be empty or just spaces',
        uniqueName: async (value: string) => {
          if (!value.trim()) return true;
          if (!isCreateMode && value === currentVehicle?.name) return true;
          return validateDBUnique(value, dataTable, 'name');
        },
      },
    },
    abrv: {
      required: 'Abbreviation is required',
      minLength: {
        value: 1,
        message: 'Abbreviation must be at least 1 character',
      },
      maxLength: {
        value: 15,
        message: 'Abbreviation must be at most 15 characters',
      },
      validate: {
        notEmpty: (value: string) =>
          value.trim() !== '' || 'Abbreviation cannot be empty or just spaces',
        uniqueName: async (value: string) => {
          if (!value.trim()) return true;
          if (!isCreateMode && value === currentVehicle?.abrv) return true;
          return validateDBUnique(value, dataTable, 'abrv');
        },
      },
    },
  };
}
