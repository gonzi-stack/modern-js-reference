// Proxies: metaprogramación para objetos

// 1. Proxy básico para validación
const validator = {
  set(target, property, value) {
    if (property === 'age') {
      if (typeof value !== 'number') {
        throw new TypeError('Age must be a number');
      }
      if (value < 0 || value > 120) {
        throw new RangeError('Age must be between 0 and 120');
      }
    }
    target[property] = value;
    return true;
  }
};

const person = new Proxy({}, validator);
person.age = 30; // OK
// person.age = 'thirty'; // TypeError
// person.age = 150; // RangeError

// 2. Proxy para logging
const withLogging = (target) => {
  return new Proxy(target, {
    get(target, property) {
      console.log(`Getting property: ${property}`);
      return target[property];
    },
    set(target, property, value) {
      console.log(`Setting property: ${property} to ${value}`);
      target[property] = value;
      return true;
    }
  });
};

const config = withLogging({
  theme: 'dark',
  language: 'en'
});

config.theme; // Log: "Getting property: theme"
config.language = 'es'; // Log: "Setting property: language to es"

// 3. Proxy para operaciones de array
const createArrayProxy = (array) => {
  return new Proxy(array, {
    get(target, prop) {
      if (prop === 'last') {
        return target[target.length - 1];
      }
      if (prop === 'first') {
        return target[0];
      }
      return Reflect.get(target, prop);
    }
  });
};

const colors = createArrayProxy(['red', 'green', 'blue']);
console.log(colors.first); // 'red'
console.log(colors.last); // 'blue'

// 4. Proxy para objetos inmutables
const immutable = (obj) => {
  return new Proxy(obj, {
    get(target, prop) {
      const value = Reflect.get(target, prop);
      return typeof value === 'object' && value !== null ? 
        immutable(value) : value;
    },
    set() {
      throw new Error('This object is immutable');
    },
    deleteProperty() {
      throw new Error('This object is immutable');
    }
  });
};

const data = immutable({ user: { name: 'Alice' } });
// data.user = {}; // Error
// data.user.name = 'Bob'; // Error (el objeto interno también es inmutable)
