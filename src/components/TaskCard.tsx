import React from 'react';
import { ColumnId, Task } from '../types';

type TaskCardProps = {
  task: Task;
  columnId: ColumnId;
  onDragStart: (
    task: Task,
    fromColumn: ColumnId
  ) => (event: React.DragEvent<HTMLDivElement>) => void;
};

const TaskCard: React.FC<TaskCardProps> = ({
  task,
  columnId,
  onDragStart,
}) => (
  <div
    className="card"
    draggable
    onDragStart={onDragStart(task, columnId)}
    role="listitem"
  >
    <h3>{task.title}</h3>
    {task.description && <p>{task.description}</p>}
  </div>
);

export default TaskCard;

