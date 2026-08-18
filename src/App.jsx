import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Recipes from './pages/Recipes'
import MealPlan from './pages/MealPlan'
import ShoppingList from './pages/ShoppingList'

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-5xl mx-auto px-4 py-6">
        <Routes>
          <Route path="/" element={<Recipes />} />
          <Route path="/meal-plan" element={<MealPlan />} />
          <Route path="/shopping-list" element={<ShoppingList />} />
        </Routes>
      </main>
    </div>
  )
}

export default App