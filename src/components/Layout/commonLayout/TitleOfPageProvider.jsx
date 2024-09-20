import React, { useState, createContext, useContext } from 'react';

// Create a context for the counter
export const CounterContext = createContext();

// Create a provider component
export const TitleOfPageProvider = ({ children }) => {
  const [count, setCount] = useState(localStorage.getItem("pageName"));

  return (
    <CounterContext.Provider value={{ count, setCount }}>
      {children}
    </CounterContext.Provider>
  );
};
