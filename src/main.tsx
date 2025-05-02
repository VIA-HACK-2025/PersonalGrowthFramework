import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import GraphLayout from './assets/GraphLayout';
// import { connectDB } from './services/db';

// await connectDB();
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <GraphLayout />
  </StrictMode>
);

