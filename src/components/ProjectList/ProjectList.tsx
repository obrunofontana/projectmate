import React, { useEffect, useRef } from 'react';

import { Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import Card from 'components/Card/Card';

import { ProjectListContainer, ProjectListContainerContent } from './ProjectListStyles';

type Project = {
  id: string;
  title: string;
  description?: string;
  color: string;
};

type ProjectListProps = {
  label: string;
  projects: Project[];
};

const ProjectList: React.FC<ProjectListProps> = ({ label, projects }) => {
  const projectContainerContentRef = useRef<HTMLDivElement>();
  const navigate = useNavigate();

  const navigateToProjectHandler = (projectId?: string) => {
    navigate(`/project/${projectId}`, { replace: true });
  };

  useEffect(() => {
    if (!projectContainerContentRef) return;

    projectContainerContentRef.current?.addEventListener('wheel', (event) => {
      event.preventDefault();

      projectContainerContentRef.current?.scrollBy({
        left: event.deltaY < 0 ? -30 : 30,
      });
    });
  }, [projectContainerContentRef]);

  return (
    <ProjectListContainer>
      <label>{label}</label>
      <ProjectListContainerContent ref={projectContainerContentRef}>
        {projects.length ? (
          projects.map((project, index) => (
            <Card
              key={index}
              borderColor={project.color}
              onClick={() => navigateToProjectHandler(project.id)}
            >
              <h3>{project.title}</h3>
              <p>{project.description}</p>
            </Card>
          ))
        ) : (
          <Box sx={{ marginTop: '2rem' }}>
            <h5>Nenhum projeto encontrado.</h5>
          </Box>
        )}
      </ProjectListContainerContent>
    </ProjectListContainer>
  );
};

export default ProjectList;
