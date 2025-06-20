function showTailwindAlert(options) {
  const {
    type = 'info',
    title = 'Notificación',
    message = 'Este es un mensaje de alerta',
    duration = 5000,
    dismissible = true
  } = options;
  
  const alert = document.createElement('div');
  alert.className = `relative bg-white rounded-xl shadow-lg overflow-hidden transform transition-all duration-300 opacity-0 translate-y-5`;
  
  // Iconos por tipo
  const icons = {
    info: 'fa-circle-info text-info',
    success: 'fa-circle-check text-success',
    warning: 'fa-triangle-exclamation text-warning',
    error: 'fa-circle-exclamation text-error'
  };
  
  // Clases de borde por tipo
  const borderColors = {
    info: 'border-l-info',
    success: 'border-l-success',
    warning: 'border-l-warning',
    error: 'border-l-error'
  };
  
  alert.innerHTML = `
    <div class="flex items-start p-4 border-l-4 ${borderColors[type]}">
      <div class="text-xl mr-3 mt-0.5">
        <i class="fa-solid ${icons[type]}"></i>
      </div>
      
      <div class="flex-1">
        <h3 class="font-semibold text-gray-800">${title}</h3>
        <p class="text-gray-600 text-sm mt-1">${message}</p>
      </div>
      
      ${dismissible ? `
        <button class="text-gray-400 hover:text-gray-600 transition-colors ml-2 mt-0.5 alert-close" aria-label="Cerrar">
          <i class="fa-solid fa-xmark"></i>
        </button>
      ` : ''}
    </div>
  `;
  
  document.getElementById('alertContainer').appendChild(alert);
  
  // Forzar reflow para activar la transición
  alert.offsetHeight;
  
  // Mostrar alerta
  alert.classList.remove('opacity-0', 'translate-y-5');
  alert.classList.add('opacity-100', 'translate-y-0');
  
  // Cierre automático
  if (duration) {
    setTimeout(() => {
      closeAlert(alert);
    }, duration);
  }
  
  // Cierre manual
  if (dismissible) {
    alert.querySelector('.alert-close').addEventListener('click', () => {
      closeAlert(alert);
    });
  }
  
  return alert;
}

function closeAlert(alert) {
  alert.classList.remove('opacity-100', 'translate-y-0');
  alert.classList.add('opacity-0', '-translate-y-5');
  
  setTimeout(() => {
    alert.remove();
  }, 300);
}

// Ejemplo de uso
document.getElementById('showAlert').addEventListener('click', () => {
  showTailwindAlert({
    type: 'success',
    title: '¡Actualización Completa!',
    message: 'Tus preferencias han sido guardadas exitosamente.',
    duration: 4000
  });
});
