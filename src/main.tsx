import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { CatalogProvider } from "./contexts/CatalogContext";
import { App } from "./App";
import { CartProvider } from "./contexts/CartContext";
import { FavoritesProvider } from "./contexts/FavoritesContext";
import { ToastProvider } from "./contexts/ToastContext";
import "./styles.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ToastProvider>
        <FavoritesProvider>
          <CatalogProvider><CartProvider>
            <App />
          </CartProvider></CatalogProvider>
        </FavoritesProvider>
      </ToastProvider>
    </BrowserRouter>
  </React.StrictMode>
);
