<!-- icons.md -->
# Uso de Iconos Modernos

## Instalación de React Icons

```bash
npm install react-icons
# o
yarn add react-icons
```

## Importación de iconos

```jsx
// Importar iconos específicos
import { FaReact } from 'react-icons/fa';
import { SiJavascript } from 'react-icons/si';
import { FiMenu } from 'react-icons/fi';
import { HiOutlineMail } from 'react-icons/hi';

// Importar todo un set
import * as FaIcons from 'react-icons/fa';
```

## Uso básico

```jsx
function MyComponent() {
  return (
    <div>
      <FaReact className="text-blue-500 text-2xl" />
      <SiJavascript className="text-yellow-400 text-2xl" />
      <FiMenu className="text-gray-700 text-2xl" />
    </div>
  );
}
```

## Iconos con animaciones

```css
/* animations.css */
.icon-hover {
  transition: transform 0.3s ease, color 0.3s ease;
}

.icon-hover:hover {
  transform: translateY(-3px);
  color: var(--primary-500);
}

.icon-spin {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

```jsx
// Uso con animaciones
<FaReact className="icon-hover icon-spin text-blue-500 text-3xl" />
```

## Iconos en botones

```jsx
<button className="btn-icon">
  <HiOutlineMail className="mr-2" />
  Enviar Email
</button>
```

## Iconos como elementos decorativos

```jsx
<div className="feature-card">
  <div className="icon-container bg-blue-100 text-blue-600">
    <FaLock className="text-2xl" />
  </div>
  <h3>Seguridad</h3>
  <p>Protección avanzada para tus datos</p>
</div>
```

## Sets de iconos recomendados

1. **Feather Icons** (`react-icons/fi`) - Iconos minimalistas y limpios
2. **Heroicons** (`react-icons/hi`) - Iconos oficiales de Tailwind CSS
3. **Font Awesome** (`react-icons/fa`) - Amplia biblioteca de iconos
4. **Simple Icons** (`react-icons/si`) - Logos de marcas y tecnologías
5. **Material Design Icons** (`react-icons/md`) - Estilo Google Material
