import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { MovieProvider } from "./context/MovieContext.jsx";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <MovieProvider>
      <>
        <App />
        <ToastContainer position="top-center" autoClose={2500} theme="dark" />
      </>
    </MovieProvider>
  </BrowserRouter>,
);
