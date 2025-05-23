import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {Provider} from "react-redux"
import ReduxProvider from './store/Providers.js'
createRoot(document.getElementById('root')).render(
  // <StrictMode>
  <ReduxProvider>
    <App />
  </ReduxProvider>
   /* </StrictMode>  */
)
