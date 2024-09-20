import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthContextProvider } from "./context/auth/AuthContext.jsx";
import { SnackContextProvider } from "./context/snack/SnackContext.jsx";
import { ConversationContextProvider } from "./context/conversation/ConversationContext.jsx";
import { SocketContextProvider } from "./context/socket/socketContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthContextProvider>
        <SnackContextProvider>
          <ConversationContextProvider>
            <SocketContextProvider>
              <App />
            </SocketContextProvider>
          </ConversationContextProvider>
        </SnackContextProvider>
      </AuthContextProvider>
    </BrowserRouter>
  </React.StrictMode>
);
