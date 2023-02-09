import React from 'react';

import Card from 'components/Card/Card';

import { ProjectListContainer, ProjectListContainerContent, Separator } from './ProjectListStyles';

type ProjectListProps = {
  label: string;
  projects: string[];
};

const ProjectList: React.FC<ProjectListProps> = ({ label, projects }) => {
  return (
    <ProjectListContainer>
      <label>{label}</label>
      <ProjectListContainerContent>
        {projects.map((project) => (
          <Card project={project} />
        ))}
      </ProjectListContainerContent>
    </ProjectListContainer>
  );
};

export default ProjectList;
