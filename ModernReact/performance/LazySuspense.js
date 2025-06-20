import React, { lazy, Suspense } from 'react';

// Componente cargado diferidamente
const LazyComponent = lazy(() => import('./HeavyComponent'));

function App() {
  const [showComponent, setShowComponent] = React.useState(false);
  
  return (
    <div>
      <button onClick={() => setShowComponent(true)}>
        Show Heavy Component
      </button>
      
      {showComponent && (
        <Suspense fallback={<div>Loading...</div>}>
          <LazyComponent />
        </Suspense>
      )}
    </div>
  );
}

// HeavyComponent.js
const HeavyComponent = () => {
  return (
    <div>
      <h2>Heavy Component Loaded</h2>
      <p>This component was loaded lazily using React.lazy and Suspense</p>
    </div>
  );
};

export default HeavyComponent;
