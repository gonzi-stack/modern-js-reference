// Best Practices: Rendimiento en JavaScript

// 1. Minimizar operaciones en el hilo principal
function heavyCalculation() {
  // Si es posible, mover a Web Worker
  const worker = new Worker('worker.js');
  
  worker.postMessage({ data: largeArray });
  worker.onmessage = (e) => {
    console.log('Result from worker:', e.data);
  };
}

// 2. Optimizar bucles
const largeArray = Array(1000000).fill().map(() => Math.random());

// Mal: operaciones pesadas en cada iteración
// for (let i = 0; i < largeArray.length; i++) {
//   const result = complexCalculation(largeArray[i]);
// }

// Bien: minimizar operaciones en el bucle
const length = largeArray.length;
for (let i = 0; i < length; i++) {
  // Operaciones ligeras
}

// 3. Uso adecuado de estructuras de datos
// Usar Map para búsquedas frecuentes
const userMap = new Map();
users.forEach(user => userMap.set(user.id, user));

// Búsqueda rápida O(1)
const user = userMap.get(123);

// 4. Memoización de funciones
function memoize(fn) {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}

const expensiveCalculation = memoize((a, b) => {
  // Cálculo costoso
  return a * b;
});

// 5. Operaciones batch para actualizaciones de DOM
function updateItems(items) {
  // Fragmento de documento para actualización batch
  const fragment = document.createDocumentFragment();
  
  items.forEach(item => {
    const element = document.createElement('div');
    element.textContent = item;
    fragment.appendChild(element);
  });
  
  document.getElementById('container').appendChild(fragment);
}

// 6. Debounce y Throttle para eventos frecuentes
function debounce(func, delay) {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
}

window.addEventListener('resize', debounce(() => {
  console.log('Resize handler');
}, 200));

// 7. Lazy loading de recursos
const lazyImage = document.querySelector('.lazy-image');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      observer.unobserve(img);
    }
  });
});

observer.observe(lazyImage);

// 8. Uso de requestAnimationFrame para animaciones
function animate() {
  // Actualizar posición
  element.style.left = `${position}px`;
  
  // Continuar animación
  if (position < 500) {
    position += 5;
    requestAnimationFrame(animate);
  }
}

requestAnimationFrame(animate);
