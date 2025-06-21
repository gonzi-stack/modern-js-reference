/**
 * Type Testing con TypeScript
 */
import { Equal, Expect, NotAny } from '@type-challenges/utils';

// 1. Test para utilidad types
type MyPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

// Tests
type cases = [
  Expect<Equal<Expected1, MyPick<Todo, 'title'>>>,
  Expect<Equal<Expected2, MyPick<Todo, 'title' | 'completed'>>>,
  Expect<NotAny<MyPick<Todo, 'title'>>>,
];

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

interface Expected1 {
  title: string;
}

interface Expected2 {
  title: string;
  completed: boolean;
}

// 2. Test para función
function concat<T extends any[], U extends any[]>(a: [...T], b: [...U]): [...T, ...U] {
  return [...a, ...b];
}

// Tests
const result = concat([1, 2], ['hello', true]);
type ResultType = typeof result; // [number, number, string, boolean]

type TestCases = [
  Expect<Equal<ResultType, [number, number, string, boolean]>>,
  Expect<Equal<typeof concat([1], [2]), [number, number]>>,
  Expect<Equal<typeof concat([], []), []>>,
];

// 3. Test para objetos complejos
type DeepPartial<T> = T extends object ? {
  [P in keyof T]?: DeepPartial<T[P]>;
} : T;

type User = {
  id: string;
  profile: {
    name: string;
    age: number;
    contacts: {
      email: string;
      phone: string;
    };
  };
};

type DeepPartialUserTest = [
  Expect<Equal<
    DeepPartial<User>,
    {
      id?: string;
      profile?: {
        name?: string;
        age?: number;
        contacts?: {
          email?: string;
          phone?: string;
        };
      };
    }
  >>
];
