// Map y Set: estructuras de datos modernas

// Map: colección de pares clave-valor (cualquier tipo de clave)
const userMap = new Map();

// Agregar elementos
userMap.set(1, { name: 'Alice' });
userMap.set('user-2', { name: 'Bob' });
userMap.set({ id: 3 }, { name: 'Charlie' });

// Obtener elementos
console.log(userMap.get(1)); // { name: 'Alice' }

// Verificar existencia
console.log(userMap.has('user-2')); // true

// Tamaño del Map
console.log(userMap.size); // 3

// Iteración
for (const [key, value] of userMap) {
  console.log(key, value);
}

// Set: colección de valores únicos
const uniqueNumbers = new Set();

// Agregar valores (los duplicados son ignorados)
uniqueNumbers.add(1);
uniqueNumbers.add(2);
uniqueNumbers.add(1); // Duplicado, no se agrega
uniqueNumbers.add(3);

console.log(uniqueNumbers.size); // 3

// Verificar existencia
console.log(uniqueNumbers.has(2)); // true

// Eliminar elemento
uniqueNumbers.delete(3);

// Convertir a Array
const numbersArray = [...uniqueNumbers];

// Caso de uso: eliminar duplicados de un array
const duplicated = [1, 2, 2, 3, 4, 4, 5];
const unique = [...new Set(duplicated)]; // [1, 2, 3, 4, 5]
