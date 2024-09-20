import { createContext, useState } from "react";

export const SnackContext = createContext();

// eslint-disable-next-line react/prop-types
export const SnackContextProvider = ({ children }) => {
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  return (
    <SnackContext.Provider
      value={{
        snackbarOpen,
        setSnackbarOpen,
        snackbarSeverity,
        setSnackbarSeverity,
        snackbarMessage,
        setSnackbarMessage,
      }}
    >
      {children}
    </SnackContext.Provider>
  );
};
