import { createContext, useContext } from 'react';
import { useFormContext as useRHFFormContext, useForm } from 'react-hook-form';

export type FormFieldContextValue<
  TFieldValues extends Record<string, unknown> = Record<string, unknown>,
  TName extends keyof TFieldValues = keyof TFieldValues,
> = {
  name: TName;
};

export const FormFieldContext = createContext<FormFieldContextValue>({} as FormFieldContextValue);

export type FormItemContextValue = {
  id: string;
};

export const FormItemContext = createContext<FormItemContextValue>({} as FormItemContextValue);

export const useFormField = () => {
  const fieldContext = useContext(FormFieldContext);
  const itemContext = useContext(FormItemContext);
  const { getFieldState, formState } = useRHFFormContext();

  const fieldState = getFieldState(fieldContext.name as string, formState);

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>');
  }

  const { id } = itemContext;

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
  };
};

export { useForm };
