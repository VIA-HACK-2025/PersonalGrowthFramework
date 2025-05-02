import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { GraphDemo } from './assets/GraphDemo'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <GraphDemo style={{ width: '100vw', height: '100vh' }} />
  </StrictMode>
);

