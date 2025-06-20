// Arrow functions: sintaxis concisa y manejo de 'this'
const numbers = [1, 2, 3, 4, 5];

// Sintaxis básica
const squares = numbers.map(n => n * n);

// Múltiples parámetros
const sum = (a, b) => a + b;

// Cuerpo de función multilínea
const processData = (data) => {
  const filtered = data.filter(item => item.active);
  return filtered.map(item => ({
    ...item,
    status: 'processed'
  }));
};

// Manejo de 'this' léxico
const counter = {
  count: 0,
  increment: function() {
    setInterval(() => {
      // 'this' se refiere al objeto counter
      this.count++;
      console.log(this.count);
    }, 1000);
  }
};

counter.increment();
