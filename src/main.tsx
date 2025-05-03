import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import GraphLayout from './assets/GraphLayout';
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "./components/pages/leadingPage";
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
            <GraphLayout />
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
