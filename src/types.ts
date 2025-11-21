export type ColumnId = 'todo' | 'inProgress' | 'done';

export type Task = {
  id: string;
  title: string;
  description: string;
};

export type BoardState = Record<ColumnId, Task[]>;

