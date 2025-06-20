import React, { useState, createContext, useContext } from 'react';

const ToggleContext = createContext();

const Toggle = ({ children }) => {
  const [on, setOn] = useState(false);
  const toggle = () => setOn(!on);
  
  return (
    <ToggleContext.Provider value={{ on, toggle }}>
      {children}
    </ToggleContext.Provider>
  );
};

const useToggleContext = () => {
  const context = useContext(ToggleContext);
  if (!context) {
    throw new Error('Toggle compound components must be rendered within Toggle');
  }
  return context;
};

const ToggleOn = ({ children }) => {
  const { on } = useToggleContext();
  return on ? children : null;
};

const ToggleOff = ({ children }) => {
  const { on } = useToggleContext();
  return on ? null : children;
};

const ToggleButton = ({ ...props }) => {
  const { on, toggle } = useToggleContext();
  return (
    <button onClick={toggle} aria-pressed={on} {...props}>
      {on ? 'ON' : 'OFF'}
    </button>
  );
};

Toggle.On = ToggleOn;
Toggle.Off = ToggleOff;
Toggle.Button = ToggleButton;

export default Toggle;

// Uso:
// <Toggle>
//   <Toggle.On>The button is on</Toggle.On>
//   <Toggle.Off>The button is off</Toggle.Off>
//   <Toggle.Button />
// </Toggle>
