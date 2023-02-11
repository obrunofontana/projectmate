import React from 'react';

import { Box, FormControl, TextField } from '@mui/material';

type Props = {
  label: string;
  value: string;
  onChange: (value: React.SetStateAction<string>) => void;
  maxLength?: number;
};

const Input: React.FC<Props> = ({ label, value, onChange, maxLength }) => {
  const onChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    onChange(event.target.value);
  };

  let helperText = '';
  if (maxLength) {
    helperText = `${value.length}/${maxLength}`;
  }

  return (
    <Box sx={{ minWidth: 50 }}>
      <FormControl fullWidth>
        <TextField
          sx={{ marginBottom: 1 }}
          autoComplete="off"
          id="outlined-input"
          label={label}
          helperText={helperText}
          value={value}
          onChange={onChangeHandler}
          inputProps={{
            maxLength,
          }}
        />
      </FormControl>
    </Box>
  );
};

export default Input;
