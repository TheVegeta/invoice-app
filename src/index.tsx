import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AppProvider from "./AppProvider";

import "bootstrap/dist/css/bootstrap-grid.min.css";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </React.StrictMode>
);
