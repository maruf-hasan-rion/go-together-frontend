export type ActionState = {
  success: boolean;
  message?: string;
  errors?: { field: string; message: string }[];
  redirectToLogin?: boolean;
};
