// Event Loop: comprensión del modelo de concurrencia en JavaScript

console.log('Start'); // 1

// Macro-tarea (setTimeout)
setTimeout(() => {
  console.log('Timeout callback'); // 4
}, 0);

// Micro-tarea (Promise)
Promise.resolve()
  .then(() => {
    console.log('Promise 1'); // 3
  })
  .then(() => {
    console.log('Promise 2'); // 3.1
  });

// Función síncrona
function syncFunction() {
  console.log('Inside sync function'); // 2
}

syncFunction();

console.log('End'); // 2.1

// Salida esperada:
// Start
// Inside sync function
// End
// Promise 1
// Promise 2
// Timeout callback

// Explicación:
// 1. Las tareas síncronas se ejecutan inmediatamente
// 2. Las micro-tareas (promesas) se ejecutan después de las tareas síncronas,
//    antes de renderizar o procesar macro-tareas
// 3. Las macro-tareas (setTimeout, setInterval) se ejecutan después de las micro-tareas
