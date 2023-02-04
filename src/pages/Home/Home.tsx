import { Button } from '@mui/material';

import { useTheme } from 'hooks/useTheme';
import i18n from 'shared/language/i18n';

const Home: React.FC = () => {
  const { toggleTheme, darkMode } = useTheme();

  return (
    <>
      <h6>Home</h6>
      <h4>{darkMode ? 'Dark' : 'Light'} Theme</h4>
      <Button
        onClick={toggleTheme}
        fullWidth
        sx={{ mt: 1 }}
        disableElevation
        type="submit"
        variant="contained"
      >
        Mudar Tema
      </Button>
      <div>{i18n.t('greeting')}</div>
    </>
  );
};

export default Home;
