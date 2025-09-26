import type { FieldErrors, FieldValues } from 'react-hook-form';
import { toast } from 'react-hot-toast';

export const onError = <T extends FieldValues>(errors: FieldErrors<T>) => {
  try {
    const firstError = Object.values(errors)[0];
    const message = firstError?.message || 'Please fix the form errors';
    toast.error(String(message), { position: 'bottom-center' });
  } catch {
    toast.error('Form validation failed', { position: 'bottom-center' });
  }
};
