import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { RoleProvider } from "./contexts/RoleContext.tsx";

createRoot(document.getElementById("root")!).render(
  <RoleProvider>
    <App />
  </RoleProvider>
);
  