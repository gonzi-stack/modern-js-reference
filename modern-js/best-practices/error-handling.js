// Best Practices: Manejo de errores

// 1. Usar Error en lugar de strings
function validateInput(input) {
  if (!input) {
    throw new Error('Input is required');
  }
}

// 2. Manejar errores de forma centralizada
class ErrorHandler {
  static handle(error) {
    console.error(`[${new Date().toISOString()}] Error:`, error.message);
    // Enviar a servicio de monitoreo
    // metrics.trackError(error);
  }
}

// 3. Usar try/catch para operaciones síncronas
try {
  validateInput('');
} catch (error) {
  ErrorHandler.handle(error);
}

// 4. Usar .catch() para promesas
fetch('https://api.example.com/data')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .catch(ErrorHandler.handle);

// 5. Usar try/catch con async/await
async function processData() {
  try {
    const data = await fetch('https://api.example.com/data');
    return process(data);
  } catch (error) {
    ErrorHandler.handle(error);
    // Re-lanzar para manejo adicional si es necesario
    throw error;
  }
}

// 6. Crear errores personalizados
class ValidationError extends Error {
  constructor(message, field) {
    super(message);
    this.name = 'ValidationError';
    this.field = field;
  }
}

function validateEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new ValidationError('Invalid email format', 'email');
  }
}

// 7. Manejo global de errores
window.addEventListener('error', (event) => {
  ErrorHandler.handle(event.error);
  // Prevenir el comportamiento por defecto del navegador
  event.preventDefault();
});

window.addEventListener('unhandledrejection', (event) => {
  ErrorHandler.handle(event.reason);
  event.preventDefault();
});
