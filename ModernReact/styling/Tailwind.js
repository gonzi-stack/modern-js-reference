import React from 'react';

function Button({ children, variant = 'primary', size = 'md', ...props }) {
  const baseClasses = "rounded-md font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white focus:ring-blue-500",
    secondary: "bg-gray-200 hover:bg-gray-300 text-gray-800 focus:ring-gray-500",
    danger: "bg-red-600 hover:bg-red-700 text-white focus:ring-red-500",
  };
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };
  
  const classes = `${baseClasses} ${variants[variant]} ${sizes[size]}`;
  
  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}

function Card({ title, children }) {
  return (
    <div className="max-w-md rounded-xl overflow-hidden shadow-lg bg-white">
      <div className="px-6 py-4">
        <h2 className="font-bold text-xl mb-2">{title}</h2>
        <p className="text-gray-700 text-base">
          {children}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <Button variant="primary">Learn More</Button>
      </div>
    </div>
  );
}

export default Card;
