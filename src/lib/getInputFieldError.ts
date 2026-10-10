export interface IInputErrorState {
  success: boolean;
  errors: {
    field: string;
    message: string;
  }[];
}
export const getInputFieldError = (fieldName: string, state: unknown) => {
  const errors = (state as { errors?: { field: string; message: string }[] } | null)?.errors;

  if (Array.isArray(errors)) {
    const error = errors.find((err) => err.field === fieldName);
    return error ? error.message : null;
  }

  return null;
};
