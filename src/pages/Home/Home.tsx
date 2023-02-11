import { useState } from 'react';

import AddIcon from '@mui/icons-material/Add';
import { Box, Container, Fab } from '@mui/material';

import { Modal, Input, TextAreaInput } from 'components';
import ProjectList from 'components/ProjectList/ProjectList';

import { HomeContainer } from './HomeStyles';

const Home: React.FC = () => {
  const [openModal, setOpenModal] = useState<boolean>(false);
  const [projectTitle, setProjectTitle] = useState<string>('');
  const [projectDescription, setProjectDescription] = useState<string>('');
  const projectsViewRecently: any = [];
  const myProjects = [
    {
      id: '9ee45dc3-7d64-4bb2-b173-b463b8ccaf17',
      title: 'Avocado',
      description: 'Projeto que irá tratar o desenvolvimento da vida de um avocado',
      color: '#61D856',
    },
    {
      id: 'c42113b6-27e7-4285-a186-c71ef7b914ed',
      title: 'Abacaxi',
      color: '#7352CF',
    },
  ];

  const publicProjects = [
    { id: '9541734c-50ac-401e-bf87-459d76fa7961', title: 'Abacate', color: '#F47E52' },
    { id: 'a35a63f6-4535-4a29-81c9-943a8d2fa97b', title: 'Banana', color: '#DB4B4B' },
    { id: '3546695c-8c2c-40fd-af88-d7cbbccdd643', title: 'Goiaba', color: '#61D856' },
    { id: 'd86e55f1-9e64-4b85-9841-665eef53b715', title: 'Morango', color: '#131FC2' },
  ];

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
