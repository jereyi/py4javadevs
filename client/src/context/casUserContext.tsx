import React, { useState, createContext } from "react";
import { UserInfo } from "../utils/types";

// Create Context Object
export const CasUserContext = createContext<{ user: any | undefined; setUser: any} | undefined >(undefined);

// Create a provider for components to consume and subscribe to changes
export const CasUserContextProvider = (props: { children: any }) => {
  const [user, setUser] = useState<UserInfo | undefined> (undefined);
  return (
    <CasUserContext.Provider value={{user, setUser}}>
      {props.children}
    </CasUserContext.Provider>
  );
};