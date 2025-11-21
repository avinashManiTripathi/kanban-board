import React from 'react';
import TaskCard from './TaskCard';
import { ColumnId, Task } from '../types';

type BoardColumnProps = {
  columnId: ColumnId;
  label: string;
  tasks: Task[];
  onDragOver: (event: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragStart: (
    task: Task,
    fromColumn: ColumnId
  ) => (event: React.DragEvent<HTMLDivElement>) => void;
};

const BoardColumn: React.FC<BoardColumnProps> = ({
  columnId,
  label,
  tasks,
  onDragOver,
  onDrop,
  onDragStart,
}) => (
  <section className="column" onDragOver={onDragOver} onDrop={onDrop}>
    <header className="column-header">
      <h2>{label}</h2>
      <span>{tasks.length}</span>
    </header>
    <div className="column-body" role="list">
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          task={task}
          columnId={columnId}
          onDragStart={onDragStart}
        />
      ))}
      {tasks.length === 0 && <p className="empty-state">Drop tasks here</p>}
    </div>
  </section>
);

export default BoardColumn;

