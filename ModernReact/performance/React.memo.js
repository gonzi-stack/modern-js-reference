import React, { memo } from 'react';

const ExpensiveComponent = ({ compute, value }) => {
  const result = compute(value);
  return <div>Result: {result}</div>;
};

// Solo se vuelve a renderizar si las props cambian
export default memo(ExpensiveComponent, (prevProps, nextProps) => {
  // Comparación personalizada para evitar renderizados innecesarios
  return prevProps.value === nextProps.value;
});
