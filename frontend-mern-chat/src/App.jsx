import "./App.css";
import { Alert, Snackbar } from "@mui/material";
import { Navigate, Route, Routes } from "react-router-dom";
import { useAuthContext } from "./context/auth/useAuthContext";
import { useSnackContext } from "./context/snack/useSnackContext";

import Login from './pages/login/Login'
import Register from './pages/register/Register'
import Home from "./pages/home/Home";

const App = () => {
  const { authUser } = useAuthContext();

  const { snackbarOpen, setSnackbarOpen, snackbarSeverity, snackbarMessage } =
    useSnackContext();

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };
  return (
    <>
      <div className="w-full h-screen flex items-center justify-center">
        <Routes>
          <Route
            path="/"
            element={authUser ? <Home /> : <Navigate to={"/login"} />}
          />
          <Route
            path="/login"
            element={authUser ? <Navigate to="/" /> : <Login />}
          />
          <Route
            path="/register"
            element={authUser ? <Navigate to="/" /> : <Register />}
          />
        </Routes>
        <Snackbar
          open={snackbarOpen}
          autoHideDuration={3000}
          onClose={handleSnackbarClose}
        >
          <Alert
            onClose={handleSnackbarClose}
            severity={snackbarSeverity}
            sx={{ width: "100%" }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </div>
    </>
  );
};

export default App;
