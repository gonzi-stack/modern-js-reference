// Higher-Order Functions: funciones que toman o devuelven funciones
const users = [
  { id: 1, name: 'Alice', age: 30, active: true },
  { id: 2, name: 'Bob', age: 25, active: false },
  { id: 3, name: 'Charlie', age: 35, active: true },
  { id: 4, name: 'Diana', age: 28, active: true }
];

// Map: transformar cada elemento
const userNames = users.map(user => user.name);

// Filter: seleccionar elementos que cumplen condición
const activeUsers = users.filter(user => user.active);

// Reduce: acumular valores
const totalAge = users.reduce((sum, user) => sum + user.age, 0);

// Sort: ordenar elementos (inmutable)
const sortedUsers = [...users].sort((a, b) => a.age - b.age);

// Find: encontrar primer elemento que cumple condición
const charlie = users.find(user => user.name === 'Charlie');

// Every: todos los elementos cumplen condición
const allActive = users.every(user => user.active);

// Some: al menos un elemento cumple condición
const hasInactive = users.some(user => !user.active);

// Encadenamiento
const result = users
  .filter(user => user.active)
  .map(user => ({ 
    ...user, 
    name: user.name.toUpperCase() 
  }))
  .sort((a, b) => a.name.localeCompare(b.name));

console.log('Active users sorted by name:', result);
