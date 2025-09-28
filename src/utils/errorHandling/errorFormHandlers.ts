import type { FieldErrors, FieldValues } from 'react-hook-form';
import { toast } from 'react-hot-toast';

/* This function is used for handling form validation errors. It receives the form errors object from react-hook-form.
It can also be used with manual validation in the onSubmitFunction where we manually call setErrors and pass the errors object here */
export const onError = (errors: FieldErrors<FieldValues>) => {
  try {
    const firstError = Object.values(errors)[0];
    const message = firstError?.message || 'Please fix the form errors';
    toast.error(String(message), { position: 'bottom-center' });
  } catch {
    toast.error('Form validation failed', { position: 'bottom-center' });
  }
};
