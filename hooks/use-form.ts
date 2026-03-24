import { useState, ChangeEvent } from 'react';
import * as v from 'valibot';

interface UseFormProps<T> {
  initialValues: T;
  schema: v.ObjectSchema<any, any>;
  onSubmit: (values: T) => Promise<void>;
}

export const useForm = <T extends Record<string, any>>({
  initialValues,
  schema,
  onSubmit,
}: UseFormProps<T>) => {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    
    let parsedValue: any = value;
    
    if (type === 'number' || type === 'range') {
      parsedValue = value === '' ? '' : Number(value);
    }
    
    setValues(prev => ({
      ...prev,
      [name]: parsedValue,
    }));
    
    // Limpiar error del campo
    if (errors[name as keyof T]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = async (): Promise<{ valid: boolean; parsed?: T }> => {
    try {
      const parsed = await v.parseAsync(schema, values);
      setErrors({});
      return { valid: true, parsed: parsed as T };
    } catch (error) {
      if (error instanceof v.ValiError) {
        const newErrors: Partial<Record<keyof T, string>> = {};
        error.issues.forEach(issue => {
          const path = issue.path?.[0]?.key as keyof T;
          if (path) {
            newErrors[path] = issue.message;
          }
        });
        setErrors(newErrors);
      }
      return { valid: false };
    }
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    
    setIsSubmitting(true);
    const { valid, parsed } = await validateForm();
    
    if (valid && parsed) {
      try {
        await onSubmit(parsed);
        setValues(initialValues);
        setErrors({});
      } catch (error) {
        console.error('Error en submit:', error);
      }
    }
    
    setIsSubmitting(false);
  };

  const resetForm = () => {
    setValues(initialValues);
    setErrors({});
  };

  const setFieldValue = (field: keyof T, value: any) => {
    setValues(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    resetForm,
    setFieldValue,
  };
};