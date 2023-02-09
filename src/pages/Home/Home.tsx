import AddIcon from '@mui/icons-material/Add';
import { Fab } from '@mui/material';

import ProjectList from 'components/ProjectList/ProjectList';

const Home: React.FC = () => {
  const projectsViewRecently = ['Goiabão'];
  const myProjects = ['Avocado', 'Abacaxi'];
  const publicProjects = [
    'Abacata',
    'Banana',
    'Goiaba',
    'Morango',
    'Uva',
    'Manga',
    'Laranja',
    'Kiwi',
  ];

  return (
    <>
      <Fab
        color="primary"
        size="small"
        aria-label="add"
        title="Novo projeto"
        sx={{ float: 'right' }}
      >
        <AddIcon />
      </Fab>
      <ProjectList label="Visualizado recentemente" projects={projectsViewRecently} />
      <ProjectList label="Meus projetos" projects={myProjects} />
      <ProjectList label="Projeto públicos" projects={publicProjects} />
    </>
  );
};

export default Home;
