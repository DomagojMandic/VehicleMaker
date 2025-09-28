import type { FieldErrors, FieldValues } from 'react-hook-form';
import { onError } from '../errorHandling/errorFormHandlers';

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
