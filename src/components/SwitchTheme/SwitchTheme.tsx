import React from 'react';

import { Box, SxProps, Theme } from '@mui/material';
import Switch from 'react-switch';

import { useTheme } from 'hooks';

type SwitchThemeProps = {
  sx?: SxProps<Theme> | undefined;
};

const SwitchTheme: React.FC<SwitchThemeProps> = ({ sx }) => {
  const { toggleTheme, darkMode } = useTheme();

  return (
    <Box sx={sx}>
      <Switch
        title="Tema"
        onChange={toggleTheme}
        checked={!darkMode}
        checkedIcon={
          <img
            style={{
              margin: '0.4rem',
              height: '70%',
              width: '70%',
            }}
            src="./sun.png"
            alt="Sun"
          />
        }
        uncheckedIcon={
          <img
            style={{
              margin: '0.4rem',
              height: '70%',
              width: '70%',
            }}
            src="./moon.png"
            alt="Moon"
          />
        }
        onColor="#EB622F"
        offColor="#505050"
      />
    </Box>
  );
};

export default SwitchTheme;
