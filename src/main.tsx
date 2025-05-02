import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { GraphDemo } from './assets/GraphDemo'
import Toolbar from './assets/Toolbar';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <div className="w-full h-[90vh]">
      <GraphDemo style={{ width: '100%', height: '100%' }} />
    </div>

    <Toolbar className="flex justify-center items-center w-full" />
  </StrictMode>
);

