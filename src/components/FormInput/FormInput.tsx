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
  background-color: #EAF0F7
  padding: 0.4rem 0.7rem;
`;

type FormInputProps = {
  name: string;
  label?: string;
  placeholder?: string;
} & InputProps;

const FormInput: React.FC<FormInputProps> = ({ name, label, placeholder, ...props }) => {
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
          <Typography
            variant="body2"
            sx={{
              mb: 1,
              fontWeight: 500,
            }}
          >
            {label}
          </Typography>

          <Input
            {...field}
            fullWidth
            disableUnderline
            placeholder={placeholder}
            sx={{
              borderRadius: '1rem',
              height: '6rem',
              backgroundColor: '#EAF0F7',
              color: '#667085',
              padding: 1,
            }}
            error={!!errors[name]}
            {...props}
          />
          <FormHelperText sx={{ marginLeft: 0 }} error={!!errors[name]}>
            {formatErrorMessage(errors)}
          </FormHelperText>
        </FormControl>
      )}
    />
  );
};

export default FormInput;
