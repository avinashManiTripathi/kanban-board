import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('Kanban board', () => {
  it('renders all three column headers', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /todo/i })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /in progress/i })
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /done/i })).toBeInTheDocument();
  });

  it('allows adding a new task to Todo', async () => {
    render(<App />);
    const input = screen.getByLabelText(/title/i);
    const button = screen.getByRole('button', { name: /add to todo/i });

    await userEvent.type(input, 'Write tests');
    await userEvent.click(button);

    expect(screen.getByText(/write tests/i)).toBeInTheDocument();
  });
});
