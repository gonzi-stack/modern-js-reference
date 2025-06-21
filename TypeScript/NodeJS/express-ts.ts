/**
 * Express con TypeScript Profesional
 */
import express, { Request, Response, NextFunction } from 'express';
import { ValidationError } from 'express-json-validator-middleware';

// Tipos para rutas
type HttpMethod = 'get' | 'post' | 'put' | 'patch' | 'delete';

interface Route {
  method: HttpMethod;
  path: string;
  handler: (req: Request, res: Response) => Promise<void>;
  middlewares?: Array<(req: Request, res: Response, next: NextFunction) => void>;
  schema?: any;
}

// Error handling tipado
class AppError extends Error {
  constructor(
    public statusCode: number,
    public message: string,
    public details?: any
  ) {
    super(message);
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

// Factory para crear aplicación Express
export function createApp(routes: Route[]) {
  const app = express();
  app.use(express.json());

  // Registrar rutas
  routes.forEach((route) => {
    const { method, path, handler, middlewares = [] } = route;
    
    // Middleware de validación si hay schema
    if (route.schema) {
      middlewares.push(validate({ body: route.schema }));
    }

    app[method](path, ...middlewares, async (req: Request, res: Response) => {
      try {
        await handler(req, res);
      } catch (error) {
        next(error);
      }
    });
  });

  // Middleware de error
  app.use((
    error: Error | AppError | ValidationError,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    if (error instanceof ValidationError) {
      return res.status(400).json({
        status: 'error',
        message: 'Validation failed',
        errors: error.validationErrors,
      });
    }

    if (error instanceof AppError) {
      return res.status(error.statusCode).json({
        status: 'error',
        message: error.message,
        details: error.details,
      });
    }

    console.error(error);
    res.status(500).json({
      status: 'error',
      message: 'Internal server error',
    });
  });

  return app;
}

// Ejemplo de uso
const routes: Route[] = [
  {
    method: 'get',
    path: '/users',
    handler: async (req, res) => {
      const users = await userService.getUsers();
      res.json(users);
    },
  },
  {
    method: 'post',
    path: '/users',
    schema: {
      type: 'object',
      required: ['name', 'email'],
      properties: {
        name: { type: 'string' },
        email: { type: 'string', format: 'email' },
      },
    },
    handler: async (req, res) => {
      const newUser = await userService.createUser(req.body);
      res.status(201).json(newUser);
    },
  },
];

const app = createApp(routes);
app.listen(3000, () => console.log('Server running on port 3000'));
