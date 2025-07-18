import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Set default theme based on user preference
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
document.body.dataset.theme = prefersDark ? 'dark' : 'light';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
