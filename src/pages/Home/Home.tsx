import { useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Container, Fab } from '@mui/material';

import { Modal, Input, TextAreaInput } from 'components';
import ProjectList from 'components/ProjectList/ProjectList';

import { HomeContainer } from './HomeStyles';

const Home: React.FC = () => {
  // feature: '#F47E52', bug: '#DB4B4B', deploy: '#61D856', infra: '#131FC2', refactor: '#7352CF',
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [projectTitle, setProjectTitle] = useState<string>('');
  const [projectDescription, setProjectDescription] = useState<string>('');
  const projectsViewRecently: any = [];
  const myProjects = [
    {
      title: 'Avocado',
      description: 'Projeto que irá tratar o desenvolvimento da vida de um avocado',
      color: '#61D856',
    },
    {
      title: 'Abacaxi',
      color: '#7352CF',
    },
  ];

  const publicProjects: any = [];
  // const publicProjects = [
  //   { title: 'Abacate', color: '#F47E52' },
  //   { title: 'Banana', color: '#DB4B4B' },
  //   { title: 'Goiaba', color: '#61D856' },
  //   { title: 'Morango', color: '#131FC2' },
  //   { title: 'Uva', color: '#7352CF' },
  //   { title: 'Manga', color: '#61D856' },
  //   { title: 'Laranja', color: '#DB4B4B' },
  //   { title: 'Kiwi', color: '#7352CF' },
  // ];

  const clearFields = () => {
    setProjectTitle('');
    setProjectDescription('');
  };

  const onCloseModalHandler = () => {
    setOpenModal(false);
    clearFields();
  };

  const onOpenModalHandler = () => {
    setOpenModal(true);
  };

  const getStringAbbreviation = (str: string, size: number) => {
    const max = 10;
    const offset = max / size;
    return str.substring(0, offset);
  };

  const getAbbreviation = (name: string) => {
    let final = '';
    const splited = name.split(' ');
    const size = splited.length;

    splited.forEach((str: string) => {
      final += getStringAbbreviation(str, size);
    });

    return final.substring(0, 10).toUpperCase().replace('-', '');
  };

  const onSaveHandler = () => {
    const alias = getAbbreviation(projectTitle);
    console.log('ALIAS:: ', alias);
    clearFields();
  };

  return (
    <>
      <Fab
        color="primary"
        size="small"
        aria-label="add"
        title="Novo projeto"
        sx={{ float: 'right' }}
        onClick={onOpenModalHandler}
      >
        <AddIcon />
      </Fab>

      <HomeContainer>
        {projectsViewRecently.length > 0 && (
          <ProjectList label="Visualizado recentemente" projects={projectsViewRecently} />
        )}

        <ProjectList label="Meus projetos" projects={myProjects} />
        <ProjectList label="Projeto públicos" projects={publicProjects} />
      </HomeContainer>

      <Modal
        maxWidth="md"
        open={openModal}
        title="Novo projeto"
        onClose={onCloseModalHandler}
        onOk={onSaveHandler}
        disableBackDropClose={true}
        disableEscClose={true}
      >
        <Container sx={{ padding: '2rem', width: '60rem' }}>
          <Box sx={{ display: 'grid', gridTemplateColumns: '1fr max-content', gap: 1 }}>
            <Input label="Título" onChange={(text) => setProjectTitle(text)} value={projectTitle} />
            <Input label="Alias" onChange={(text) => setProjectTitle(text)} value={projectTitle} />
          </Box>
          <TextAreaInput
            label="Descrição"
            onChange={(text) => setProjectDescription(text)}
            value={projectDescription}
          />
        </Container>
      </Modal>
    </>
  );
};

export default Home;
