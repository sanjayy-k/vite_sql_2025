import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './App.css'
import App1 from './App1.tsx'
import { BrowserRouter as Router} from 'react-router-dom'
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Router>
     <App1/>
    </Router>
  </StrictMode>,
)
