import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./AppRoutes.jsx";
import AppRoutes from "./AppRoutes.jsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./lib/store.js";
import queryClient from "./lib/queryCLient.js";

createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  </QueryClientProvider>
);
