import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { GraphDemo } from "./assets/GraphDemo";
import Toolbar from "./assets/Toolbar";
import { LandingPage } from "./components/pages/leadingPage"; // <- create this
import { LoginPage } from "./components/pages/loginPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/graph"
          element={
            <>
              <div className="w-full h-[90vh]">
                <GraphDemo style={{ width: "100%", height: "100%" }} />
              </div>
              <Toolbar className="flex justify-center items-center w-full" />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
