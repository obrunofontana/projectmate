import React from 'react';

import { Card } from 'components';

import { Container, TaskList } from './ColumnStyles';

type ColumnModel = {
  id: string;
  title: string;
};

interface ColumnProps {
  column: ColumnModel;
  index: number;
}

const Column: React.FC<ColumnProps> = ({ column, index }) => {
  const tasks = [
    { id: '1', title: 'Implementar Login', borderColor: '#434' },
    { id: '2', title: 'Implementar Card', borderColor: '#543' },
    { id: '3', title: 'Implementar Dark mode', borderColor: '#412' },
    { id: '4', title: 'Implementar Dark mode', borderColor: '#412' },
    { id: '5', title: 'Implementar Dark mode', borderColor: '#412' },
    { id: '6', title: 'Implementar Dark mode', borderColor: '#412' },
    { id: '7', title: 'Implementar Dark mode', borderColor: '#412' },
    { id: '8', title: 'Implementar Dark mode', borderColor: '#412' },
    { id: '9', title: 'Implementar Dark mode', borderColor: '#412' },
  ];

  return (
    <Container isFirstColumn={index === 0}>
      <h4 style={{ cursor: 'grab ' }}>{column.title}</h4>

      {/* <Card
        sx={{
          height: '2rem',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 1,
        }}
      >
        <h4>+ Adicionar tarefa</h4>
      </Card> */}
      <TaskList>
        {tasks.map((task) => (
          <Card key={task.id} borderColor={task.borderColor}>
            <h4>{task.title}</h4>
          </Card>
        ))}
      </TaskList>
    </Container>
  );
};

export default Column;
