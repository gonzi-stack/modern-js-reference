import React, { useState, useEffect } from 'react';
import { FaCircleInfo, FaCircleCheck, FaTriangleExclamation, FaCircleExclamation, FaXmark } from 'react-icons/fa6';

const Alert = ({ 
  type = 'info', 
  title = 'Notificación', 
  message = 'Este es un mensaje de alerta', 
  duration = 5000,
  dismissible = true,
  onClose 
}) => {
  const [isVisible, setIsVisible] = useState(true);
  const [isClosing, setIsClosing] = useState(false);
  
  const icons = {
    info: <FaCircleInfo className="text-blue-500" />,
    success: <FaCircleCheck className="text-green-500" />,
    warning: <FaTriangleExclamation className="text-yellow-500" />,
    error: <FaCircleExclamation className="text-red-500" />
  };
  
  const borderColors = {
    info: 'border-l-blue-500',
    success: 'border-l-green-500',
    warning: 'border-l-yellow-500',
    error: 'border-l-red-500'
  };
  
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      onClose?.();
    }, 300);
  };
  
  useEffect(() => {
    if (duration) {
      const timer = setTimeout(handleClose, duration);
      return () => clearTimeout(timer);
    }
  }, [duration]);
  
  if (!isVisible) return null;
  
  return (
    <div className={`relative mb-4 max-w-md mx-auto bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 ${
      isClosing ? 'opacity-0 -translate-y-5' : 'opacity-100 translate-y-0'
    }`}>
      <div className={`flex items-start p-4 border-l-4 ${borderColors[type]}`}>
        <div className="text-xl mr-3 mt-0.5">
          {icons[type]}
        </div>
        
        <div className="flex-1">
          <h3 className="font-semibold text-gray-800">{title}</h3>
          <p className="text-gray-600 text-sm mt-1">{message}</p>
        </div>
        
        {dismissible && (
          <button 
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors ml-2 mt-0.5"
            aria-label="Cerrar"
          >
            <FaXmark />
          </button>
        )}
      </div>
    </div>
  );
};

export const AlertContainer = ({ children }) => {
  return (
    <div className="fixed top-4 right-4 z-50 w-full max-w-sm space-y-3">
      {children}
    </div>
  );
};

export default Alert;

// Uso:
// <AlertContainer>
//   <Alert 
//     type="success" 
//     title="¡Éxito!" 
//     message="Operación completada con éxito" 
//     duration={3000} 
//   />
// </AlertContainer>
