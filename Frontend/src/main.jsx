import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LazyMotion, domAnimation } from 'framer-motion'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { LoadingProvider } from './context/LoadingContext'
import './index.css'
import App from './App.jsx'

// Initialize the app with cleaner setup for router
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LazyMotion features={domAnimation}>
      <LoadingProvider>
        <BrowserRouter>
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </BrowserRouter>
      </LoadingProvider>
    </LazyMotion>
  </StrictMode>,
)
