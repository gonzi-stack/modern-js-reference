/**
 * Jerarquía de errores personalizados
 * 
 * Ejemplo: Manejo estructurado de errores en APIs
 */
class AppError extends Error {
  constructor(
    public readonly code: string,
    message: string,
    public readonly context?: Record<string, any>
  ) {
    super(message);
    this.name = this.constructor.name;
    Error.captureStackTrace?.(this, this.constructor);
  }
}

class ValidationError extends AppError {
  constructor(field: string, message: string) {
    super('VALIDATION_ERROR', message, { field });
  }
}

class DatabaseError extends AppError {
  constructor(query: string, error: Error) {
    super('DATABASE_ERROR', 'Error en operación de base de datos', { query, error });
  }
}

// Uso:
try {
  // Lógica que puede fallar
  throw new ValidationError('email', 'Formato de email inválido');
} catch (error) {
  if (error instanceof ValidationError) {
    console.error(`Error de validación en ${error.context.field}: ${error.message}`);
    // Enviar respuesta específica al cliente
  } else if (error instanceof DatabaseError) {
    // Manejar error de base de datos
    console.error('Error de DB:', error.context.query);
  }
}
