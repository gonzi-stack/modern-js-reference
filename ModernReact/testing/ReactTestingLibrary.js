import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

function Counter({ initialCount = 0 }) {
  const [count, setCount] = React.useState(initialCount);
  
  return (
    <div>
      <p data-testid="count">Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <button onClick={() => setCount(count - 1)}>Decrement</button>
      <button onClick={() => setCount(0)}>Reset</button>
    </div>
  );
}

test('counter increments and decrements correctly', () => {
  render(<Counter />);
  
  const count = screen.getByTestId('count');
  const incrementBtn = screen.getByText('Increment');
  const decrementBtn = screen.getByText('Decrement');
  const resetBtn = screen.getByText('Reset');
  
  // Verificar estado inicial
  expect(count).toHaveTextContent('Count: 0');
  
  // Incrementar
  fireEvent.click(incrementBtn);
  expect(count).toHaveTextContent('Count: 1');
  
  // Decrementar
  fireEvent.click(decrementBtn);
  expect(count).toHaveTextContent('Count: 0');
  
  // Resetear
  fireEvent.click(incrementBtn);
  fireEvent.click(incrementBtn);
  fireEvent.click(resetBtn);
  expect(count).toHaveTextContent('Count: 0');
});

test('counter starts with initial value', () => {
  render(<Counter initialCount={5} />);
  expect(screen.getByTestId('count')).toHaveTextContent('Count: 5');
});
