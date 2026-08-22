import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { RecipeProvider } from './context/RecipeContext'
import { MealPlanProvider } from './context/MealPlanContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <RecipeProvider>
        <MealPlanProvider>
          <App />
        </MealPlanProvider>
      </RecipeProvider>
    </BrowserRouter>
  </StrictMode>,
)