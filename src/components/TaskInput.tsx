import React from 'react';

type TaskInputProps = {
  id: string;
  label: string;
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  rows?: number;
};

const TaskInput: React.FC<TaskInputProps> = ({
  id,
  label,
  value,
  placeholder,
  onChange,
  multiline = false,
  rows = 2,
}) => (
  <div className="field">
    <label htmlFor={id}>{label}</label>
    {multiline ? (
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        rows={rows}
      />
    ) : (
      <input
        id={id}
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
    )}
  </div>
);

export default TaskInput;

