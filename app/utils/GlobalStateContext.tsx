// GlobalStateContext.js
import { createContext, useContext, useState } from "react";

const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [alreadyExists, setAlreadyExists] = useState(false);
  const [created, setCreated] = useState(false);

  return (
    <GlobalStateContext.Provider
      value={{ alreadyExists, setAlreadyExists, created, setCreated }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export const useGlobalState = () => useContext(GlobalStateContext);
