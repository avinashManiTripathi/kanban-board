import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './App.css';
import TaskInput from './components/TaskInput';
import PrimaryButton from './components/PrimaryButton';
import Header from './components/Header';
import BoardColumn from './components/BoardColumn';
import { BoardState, ColumnId, Task } from './types';

const STORAGE_KEY = 'kanban-board-state';

const columnConfig: { id: ColumnId; label: string }[] = [
  { id: 'todo', label: 'Todo' },
  { id: 'inProgress', label: 'In Progress' },
  { id: 'done', label: 'Done' },
];

const defaultBoardState: BoardState = {
  todo: [
    {
      id: 'seed-1',
      title: 'Explore requirements',
      description: 'Review project goals and constraints.',
    },
  ],
  inProgress: [
    {
      id: 'seed-2',
      title: 'Design workflow',
      description: 'Map out column structure and drag-drop plan.',
    },
  ],
  done: [
    {
      id: 'seed-3',
      title: 'Set up project',
      description: 'Initialize CRA + TypeScript environment.',
    },
  ],
};

const loadBoardState = (): BoardState => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored) as BoardState;
      if (parsed.todo && parsed.inProgress && parsed.done) {
        return parsed;
      }
    }
  } catch {
    // ignore malformed data
  }
  return defaultBoardState;
};

const App: React.FC = () => {
  const [board, setBoard] = useState<BoardState>(() => loadBoardState());
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(board));
  }, [board]);

  const resetInputs = () => {
    setTitle('');
    setDescription('');
  };

  const handleAddTask = (event: React.FormEvent) => {
    event.preventDefault();
    if (!title.trim()) {
      return;
    }

    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: title.trim(),
      description: description.trim(),
    };

    setBoard((prev) => ({
      ...prev,
      todo: [newTask, ...prev.todo],
    }));
    resetInputs();
  };

  const handleDragStart = (task: Task, fromColumn: ColumnId) => (
    event: React.DragEvent<HTMLDivElement>
  ) => {
    event.dataTransfer.setData(
      'application/json',
      JSON.stringify({ task, fromColumn })
    );
    event.dataTransfer.effectAllowed = 'move';
  };

  const moveTask = useCallback(
    (task: Task, fromColumn: ColumnId, toColumn: ColumnId) => {
      if (fromColumn === toColumn) {
        return;
      }
      setBoard((prev) => {
        const sourceTasks = prev[fromColumn].filter((t) => t.id !== task.id);
        const targetTasks = [task, ...prev[toColumn]];
        return {
          ...prev,
          [fromColumn]: sourceTasks,
          [toColumn]: targetTasks,
        } as BoardState;
      });
    },
    []
  );

  const handleDrop = (toColumn: ColumnId) => (
    event: React.DragEvent<HTMLDivElement>
  ) => {
    event.preventDefault();
    const data = event.dataTransfer.getData('application/json');
    if (!data) return;
    try {
      const parsed = JSON.parse(data) as { task: Task; fromColumn: ColumnId };
      moveTask(parsed.task, parsed.fromColumn, toColumn);
    } catch {
      // ignore parse errors
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  };

  const isAddDisabled = useMemo(() => !title.trim(), [title]);

  return (
    <div className="App">
      <Header />

      <section className="task-form-container">
        <form className="task-form" onSubmit={handleAddTask}>
          <TaskInput
            id="task-title"
            label="Title"
            value={title}
            onChange={setTitle}
            placeholder="Add a new task"
          />
          <TaskInput
            id="task-description"
            label="Description"
            value={description}
            onChange={setDescription}
            placeholder="Optional details"
            multiline
            rows={2}
          />
          <PrimaryButton type="submit" disabled={isAddDisabled} label="Add to Todo" />
        </form>
      </section>

      <main className="board">
        {columnConfig.map(({ id, label }) => (
          <BoardColumn
            key={id}
            columnId={id}
            label={label}
            tasks={board[id]}
            onDragOver={handleDragOver}
            onDrop={handleDrop(id)}
            onDragStart={handleDragStart}
          />
        ))}
      </main>
    </div>
  );
};

export default App;
