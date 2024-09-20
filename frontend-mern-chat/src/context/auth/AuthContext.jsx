import { createContext, useState } from "react";

export const AuthContext = createContext();

// eslint-disable-next-line react/prop-types
export const AuthContextProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(
    JSON.parse(localStorage.getItem("chatUser")) || null
  );
  const [lastSeen, setLastSeen] = useState("")

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser, lastSeen, setLastSeen }}>
      {children}
    </AuthContext.Provider>
  );
};
