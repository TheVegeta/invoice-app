import React from "react";
import ReactDOM from "react-dom/client";
import AppProvider from "./AppProvider";

import "bootstrap/dist/css/bootstrap-grid.min.css";
import AppRoute from "./AppRoute";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <React.StrictMode>
    <AppProvider>
      <AppRoute />
    </AppProvider>
  </React.StrictMode>
);
