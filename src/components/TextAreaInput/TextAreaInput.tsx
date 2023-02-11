import React from 'react';

import { Box, FormControl, TextField } from '@mui/material';

type Props = {
  label: string;
  value: string;
  onChange: (value: React.SetStateAction<string>) => void;
  maxLength?: number;
};

const TextAreaInput: React.FC<Props> = ({ label, value, onChange, maxLength = 100 }) => {
  const onChangeHandler = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    onChange(event.target.value);
  };

  const helperText = `${value.length}/${maxLength}`;

  return (
    <Box sx={{ minWidth: 200 }}>
      <FormControl fullWidth>
        <TextField
          id="outlined-textarea"
          label={label}
          rows={2}
          multiline
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

export default TextAreaInput;
