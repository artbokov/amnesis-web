import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";
import { App } from "./containers";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import { UserProvider } from "./contexts/UserContext";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const queryClient = new QueryClient();

root.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </UserProvider>
    </QueryClientProvider>
  </React.StrictMode>
);
