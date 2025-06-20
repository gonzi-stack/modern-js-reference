// Inmutabilidad: trabajar sin modificar datos originales

// 1. Arrays: usar métodos que no mutan
const numbers = [1, 2, 3, 4, 5];

// Mal: mutación directa
// numbers.push(6);

// Bien: crear nuevo array
const newNumbers = [...numbers, 6];

// Filtrar sin mutar
const evenNumbers = numbers.filter(n => n % 2 === 0);

// Mapear sin mutar
const doubled = numbers.map(n => n * 2);

// 2. Objetos: usar spread operator
const user = { name: 'Alice', age: 30 };

// Actualizar propiedad
const updatedUser = { ...user, age: 31 };

// Agregar propiedad
const userWithEmail = { ...user, email: 'alice@example.com' };

// Eliminar propiedad (con destructuring)
const { age, ...userWithoutAge } = user;

// 3. Actualizaciones profundas
const state = {
  user: {
    name: 'Bob',
    address: {
      city: 'New York',
      country: 'USA'
    }
  },
  settings: {
    theme: 'dark'
  }
};

// Actualizar ciudad sin mutar
const newState = {
  ...state,
  user: {
    ...state.user,
    address: {
      ...state.user.address,
      city: 'Los Angeles'
    }
  }
};

// Alternativa con librerías como Immer
/*
import produce from 'immer';

const newState = produce(state, draft => {
  draft.user.address.city = 'Los Angeles';
});
*/

// 4. Beneficios:
// - Predictibilidad
// - Facilita cambio-detection (React, Vue)
// - Menos efectos secundarios
// - Mejor para concurrencia
