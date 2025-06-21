/**
 * Utility Types Avanzados con Ejemplos Prácticos
 */
type User = {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
  roles: ("admin" | "editor" | "viewer")[];
};

// 1. Partial pero manteniendo ciertas propiedades requeridas
type PartialWithRequired<T, K extends keyof T> = Partial<T> & Pick<T, K>;

type UserUpdate = PartialWithRequired<User, "id">;

// 2. Omit con redefinición de tipo
type SafeUser = Omit<User, "email"> & {
  email: string | null;
};

// 3. Tipos condicionales
type NonNullableFields<T> = {
  [K in keyof T]: T[K] extends null ? never : K;
}[keyof T];

type UserNonNull = Pick<User, NonNullableFields<User>>;

// 4. Mapeo de unión a objeto
type RoleActions = {
  [Role in User["roles"][number]]: () => void;
};

// 5. Función builder con tipos seguros
function createBuilder<T extends object>(initial: T) {
  return {
    set<Key extends keyof T>(key: Key, value: T[Key]) {
      return createBuilder({ ...initial, [key]: value });
    },
    build(): Readonly<T> {
      return Object.freeze(initial);
    },
  };
}

const userBuilder = createBuilder({ id: "", name: "" })
  .set("id", "user-123")
  .set("name", "John")
  .build();
