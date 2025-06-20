# Guía de Uso de Modern Alerts

## Instalación
```html
<!-- Para implementación HTML/CSS/JS -->
<link rel="stylesheet" href="path/to/alert-styles.css">
<script src="path/to/alerts.js"></script>

<!-- Para Tailwind CSS -->
<script src="https://cdn.tailwindcss.com"></script>
<script src="path/to/tailwind-alert.js"></script>
```

## Uso básico (JavaScript)
```javascript
// Mostrar alerta básica
showAlert({
  type: 'success',
  title: '¡Operación Exitosa!',
  message: 'Los cambios se han guardado correctamente.',
  duration: 3000
});

// Mostrar alerta persistente
showAlert({
  type: 'warning',
  title: 'Advertencia',
  message: 'Esta acción no se puede deshacer.',
  dismissible: true,
  duration: 0 // Sin cierre automático
});
```

## Uso en React
```jsx
import Alert, { AlertContainer } from './AlertComponent';
import useAlert from './useAlert';

// Componente individual
function App() {
  return (
    <div>
      <Alert 
        type="info"
        title="Información Importante"
        message="Esta es una alerta de información"
      />
    </div>
  );
}

// Con hook
function AlertDemo() {
  const { showAlert, AlertContainer } = useAlert();
  
  return (
    <div>
      <button onClick={() => showAlert({ type: 'success', title: 'Éxito!', message: 'Mensaje enviado' })}>
        Mostrar Alerta
      </button>
      <AlertContainer />
    </div>
  );
}
```

## Personalización

### Tipos disponibles
- `info` - Información general
- `success` - Operaciones exitosas
- `warning` - Advertencias
- `error` - Errores o problemas críticos

### Opciones
| Propiedad   | Tipo    | Default           | Descripción                     |
|-------------|---------|-------------------|---------------------------------|
| type        | string  | 'info'            | Tipo de alerta                  |
| title       | string  | 'Notificación'    | Título de la alerta             |
| message     | string  | 'Mensaje de alerta' | Contenido principal            |
| duration    | number  | 5000              | Duración en milisegundos (0 = persistente) |
| dismissible | boolean | true              | Permite cerrar manualmente      |

## Personalización avanzada
Para personalizar estilos:
```css
/* Sobreescribir variables CSS */
:root {
  --info: #3b82f6;
  --success: #10b981;
  --warning: #f59e0b;
  --error: #ef4444;
  --shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

/* Personalizar estilos de alerta */
.alert {
  border-radius: 16px;
  font-family: 'Inter', sans-serif;
}
```

Para Tailwind CSS, modifique el archivo de configuración:
```js
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        info: '#3b82f6',
        success: '#10b981',
        warning: '#f59e0b',
        error: '#ef4444'
      }
    }
  }
}
```
