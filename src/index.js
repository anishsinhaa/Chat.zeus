import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import {AuthContextProvider} from "./Context/AuthContext"
import { ChatContextProvider } from "./Context/ChatContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
    <ChatContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
      </ChatContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
