import React from 'react';

import { Box } from '@mui/material';

import Column from './Column/Column';
import { ColumnsContainer } from './KanbanBoardStyles';

const KanbanBoard: React.FC = () => {
  const columns = [
    { id: '1', title: 'Backlog' },
    { id: '2', title: 'Pronta desenvolvimento' },
    { id: '3', title: 'Em desenvolvimento ' },
    { id: '4', title: 'Desenvolvido' },
    { id: '5', title: 'Code Review' },
    { id: '6', title: 'Pronta para validação' },
    { id: '7', title: 'Aprovada validação' },
    { id: '8', title: 'Pronta para teste' },
    { id: '9', title: 'Em teste' },
    { id: '10', title: 'Teste aprovado' },
    { id: '11', title: 'Documentação' },
    { id: '12', title: 'Deploy produção' },
    { id: '13', title: 'Finalizada' },
  ];
  return (
    <Box>
      <h1>Kanban board</h1>
      <ColumnsContainer>
        {columns.map((column, index) => {
          return <Column key={column.id} index={index} column={column} />;
        })}
      </ColumnsContainer>
    </Box>
  );
};

export default KanbanBoard;
