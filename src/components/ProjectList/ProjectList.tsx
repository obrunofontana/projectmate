import React, { useEffect, useRef } from 'react';

import Card from 'components/Card/Card';

import { ProjectListContainer, ProjectListContainerContent } from './ProjectListStyles';

type ProjectListProps = {
  label: string;
  projects: string[];
};

const ProjectList: React.FC<ProjectListProps> = ({ label, projects }) => {
  const projectContainerContentRef = useRef<HTMLDivElement>();

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
        {projects.map((project, index) => (
          <Card project={project} key={index} />
        ))}
      </ProjectListContainerContent>
    </ProjectListContainer>
  );
};

export default ProjectList;
