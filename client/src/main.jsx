import { createRoot } from "react-dom/client";
import "./index.css";
import AppRoutes from "./AppRoutes.jsx";
import { QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { store } from "./lib/store.js";
import queryClient from "./lib/queryClient.js";

createRoot(document.getElementById("root")).render(
  // QueryClientProvider owns server cache; Redux owns app/session UI state.
  <QueryClientProvider client={queryClient}>
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  </QueryClientProvider>
);
