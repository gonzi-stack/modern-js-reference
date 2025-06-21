/**
 * Sistema de Inyección de Dependencias con Tipos
 */
interface Logger {
  log(message: string): void;
  error(message: string): void;
}

interface Database {
  query<T>(sql: string): Promise<T[]>;
}

// Contenedor de dependencias
class Container {
  private dependencies = new Map<symbol, any>();

  register<T>(key: string, instance: T): void {
    this.dependencies.set(Symbol.for(key), instance);
  }

  resolve<T>(key: string): T {
    const symbol = Symbol.for(key);
    const instance = this.dependencies.get(symbol);
    
    if (!instance) {
      throw new Error(`Dependency not found: ${key}`);
    }
    
    return instance;
  }
}

// Implementaciones concretas
class ConsoleLogger implements Logger {
  log(message: string) {
    console.log(`[LOG] ${message}`);
  }
  error(message: string) {
    console.error(`[ERROR] ${message}`);
  }
}

class PostgresDatabase implements Database {
  async query<T>(sql: string): Promise<T[]> {
    // Implementación real
    return [] as T[];
  }
}

// Registro de dependencias
const container = new Container();
container.register<Logger>("Logger", new ConsoleLogger());
container.register<Database>("Database", new PostgresDatabase());

// Clase que utiliza dependencias
class UserService {
  constructor(
    private logger: Logger,
    private database: Database
  ) {}

  async getUsers() {
    this.logger.log("Fetching users");
    return this.database.query<User>("SELECT * FROM users");
  }
}

// Factory para crear servicios con dependencias inyectadas
function createService<T>(Service: new (...args: any[]) => T): T {
  const params = Reflect.getMetadata("design:paramtypes", Service) || [];
  const dependencies = params.map((dep: any) => {
    const key = dep.name;
    return container.resolve(key);
  });
  
  return new Service(...dependencies);
}

// Uso
const userService = createService(UserService);
userService.getUsers();
