import React, { useState, createContext } from "react";

// Create Context Object
export const CasUserContext = createContext<{ user: string; setUser: React.Dispatch<React.SetStateAction<string>>; } | undefined>(undefined);

// Create a provider for components to consume and subscribe to changes
export const CasUserContextProvider = (props: { children: any }) => {
  const [user, setUser] = useState("");

  return (
    <CasUserContext.Provider value={{ user, setUser }}>
      {props.children}
    </CasUserContext.Provider>
  );
};