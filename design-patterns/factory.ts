/**
 * Factory Pattern Modern Implementation
 * 
 * Proporciona una interfaz para crear objetos sin especificar su clase concreta
 * 
 * Ejemplo: Creación de diferentes tipos de notificaciones
 */
interface Notification {
  send(user: string, message: string): void;
}

class EmailNotification implements Notification {
  send(user: string, message: string) {
    console.log(`Enviando email a ${user}: ${message}`);
    // Lógica real de envío aquí
  }
}

class PushNotification implements Notification {
  send(user: string, message: string) {
    console.log(`Enviando push a ${user}: ${message}`);
    // Lógica real de envío aquí
  }
}

class NotificationFactory {
  static create(type: 'email' | 'push'): Notification {
    switch (type) {
      case 'email':
        return new EmailNotification();
      case 'push':
        return new PushNotification();
      default:
        throw new Error(`Tipo de notificación no soportado: ${type}`);
    }
  }
}

// Uso:
const emailNotifier = NotificationFactory.create('email');
emailNotifier.send('usuario@ejemplo.com', '¡Hola desde la fábrica!');
