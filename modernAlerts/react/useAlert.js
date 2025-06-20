import { useState, useCallback } from 'react';

const useAlert = () => {
  const [alerts, setAlerts] = useState([]);
  
  const showAlert = useCallback((options) => {
    const id = Date.now().toString();
    const alert = { ...options, id };
    
    setAlerts(prev => [...prev, alert]);
    
    if (options.duration) {
      setTimeout(() => {
        removeAlert(id);
      }, options.duration);
    }
    
    return id;
  }, []);
  
  const removeAlert = useCallback((id) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  }, []);
  
  const AlertContainer = () => (
    <div className="fixed top-4 right-4 z-50 w-full max-w-sm space-y-3">
      {alerts.map(alert => (
        <AlertComponent 
          key={alert.id}
          {...alert}
          onClose={() => removeAlert(alert.id)}
        />
      ))}
    </div>
  );
  
  return { showAlert, removeAlert, AlertContainer };
};

export default useAlert;

// Uso en componente:
// const { showAlert, AlertContainer } = useAlert();
// 
// <div>
//   <button onClick={() => showAlert({ type: 'success', title: 'Éxito', message: 'Operación completada' })}>
//     Mostrar Alerta
//   </button>
//   <AlertContainer />
// </div>
