// Async/Await: sintaxis moderna para manejo asíncrono
async function fetchUserData(userId) {
  try {
    // Esperar a que se resuelva la promesa
    const response = await fetch(`https://api.example.com/users/${userId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error;
  }
}

// Uso con IIFE (Immediately Invoked Function Expression)
(async () => {
  try {
    const user = await fetchUserData(123);
    console.log('User data:', user);
  } catch (error) {
    console.error('Failed to load user:', error);
  }
})();

// Manejo paralelo con Promise.all()
async function fetchMultipleUsers(userIds) {
  const promises = userIds.map(id => fetchUserData(id));
  return Promise.all(promises);
}

fetchMultipleUsers([123, 456, 789])
  .then(users => console.log('All users:', users))
  .catch(error => console.error('Error fetching multiple users:', error));
