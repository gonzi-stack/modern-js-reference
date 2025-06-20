# Modern Alerts Collection

Colección de componentes de alerta modernos para diferentes tecnologías:

- HTML/CSS/JS Vanilla
- React
- Tailwind CSS
- Vue (próximamente)

## Características

✅ Diseño moderno con sombras y bordes redondeados  
✅ Tipos de alerta: info, éxito, advertencia, error  
✅ Animaciones fluidas de entrada/salida  
✅ Soporte para cierre automático y manual  
✅ Iconos integrados  
✅ Totalmente responsivo  
✅ Accesible (ARIA compatible)  
✅ Fácil personalización  

## Ejemplos

```javascript
// Alerta básica
showAlert({
  type: 'success',
  title: '¡Completado!',
  message: 'La operación se realizó con éxito',
  duration: 3000
});

// Alerta persistente
showAlert({
  type: 'warning',
  title: 'Atención',
  message: 'Esta acción no se puede deshacer',
  dismissible: true,
  duration: 0
});
