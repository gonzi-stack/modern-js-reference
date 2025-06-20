// Module Pattern: encapsulación con módulos ES6

// Exportación nombrada
export const API_URL = 'https://api.example.com';

export function fetchData(endpoint) {
  return fetch(`${API_URL}/${endpoint}`)
    .then(response => response.json());
}

// Exportación por defecto
export default class DataService {
  constructor(apiKey) {
    this.apiKey = apiKey;
  }

  async get(endpoint) {
    const response = await fetch(`${API_URL}/${endpoint}`, {
      headers: { Authorization: `Bearer ${this.apiKey}` }
    });
    return response.json();
  }

  post(endpoint, data) {
    return fetch(`${API_URL}/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${this.apiKey}`
      },
      body: JSON.stringify(data)
    });
  }
}

// Uso en otro archivo
/*
import DataService, { fetchData } from './module-pattern.js';

const service = new DataService('my-api-key');
service.get('users').then(users => console.log(users));

fetchData('posts').then(posts => console.log(posts));
*/
