import React, { ReactNode } from 'react';

import {
  FormHelperText,
  Typography,
  FormControl,
  Input as _Input,
  InputProps,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { Controller, FieldErrors, FieldValues, useFormContext } from 'react-hook-form';

const Input = styled(_Input)`
  background-color: white;
  padding: 0.4rem 0.7rem;
`;

type FormInputProps = {
  name: string;
  label: string;
} & InputProps;

const FormInput: React.FC<FormInputProps> = ({ name, label, ...props }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const formatErrorMessage = (errorsParams: FieldErrors<FieldValues>): ReactNode | string => {
    const error = !!errorsParams[name];

    if (error) {
      return `${errorsParams[name]?.message}`;
    }

    return '';
  };

  return (
    <Controller
      control={control}
      defaultValue=""
      name={name}
      render={({ field }) => (
        <FormControl fullWidth sx={{ mb: 2 }}>
          <Typography variant="body2" sx={{ color: '#633BBC', mb: 1, fontWeight: 500 }}>
            {label}
          </Typography>

          <Input
            {...field}
            fullWidth
            disableUnderline
            sx={{ borderRadius: '1rem' }}
            error={!!errors[name]}
            {...props}
          />
          <FormHelperText error={!!errors[name]}>{formatErrorMessage(errors)}</FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default FormInput;
