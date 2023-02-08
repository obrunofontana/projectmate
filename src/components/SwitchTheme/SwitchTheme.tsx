import React from 'react';

import Switch from 'react-switch';

import { useTheme } from 'hooks';

const SwitchTheme: React.FC = () => {
  const { toggleTheme, darkMode } = useTheme();

  return (
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
      onColor="#F6F6F6"
      offColor="#14162E"
    />
  );
};

export default SwitchTheme;
